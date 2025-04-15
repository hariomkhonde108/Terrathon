import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = '';
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to fetch product details from World Food Facts API
const fetchProductDetails = async (productName) => {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(productName)}&json=1`);
    const data = await response.json();
    
    if (data.products && data.products.length > 0) {
      const product = data.products[0];
      return {
        ecoScore: product.ecoscore_grade || 'Unknown',
        packaging: product.packaging || 'Plastic',
        carbonFootprint: product.carbon_footprint_per_100g || 'Unknown',
        ingredients: product.ingredients_text || 'Not specified',
        brand: product.brands || 'Unknown'
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};

const formatHighlightedText = (text, type) => {
  const boldKeyTerms = (str) => {
    const terms = ['recyclable', 'biodegradable', 'harmful', 'eco-friendly', 'carbon footprint', 'impact'];
    let result = str;
    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      result = result.replace(regex, term);
    });
    result = result.replace(/\$|\bUSD\b/gi, '₹');
    return result;
  };

  const formattedText = boldKeyTerms(text);
  switch (type) {
    case 'warning':
      return `⚠️ ${formattedText}`;
    case 'good':
      return `✅ ${formattedText}`;
    case 'highlight':
      return `🔍 ${formattedText}`;
    default:
      return formattedText;
  }
};

const addEmojisToText = (text) => {
  const emojiMap = {
    'packaging': '📦',
    'recycling': '♻️',
    'eco': '🌱',
    'carbon': '🌍',
    'impact': '💨',
    'price': '💰',
    'buy': '🛍️',
    'rating': '⭐'
  };

  let enhancedText = text;
  Object.entries(emojiMap).forEach(([word, emoji]) => {
    enhancedText = enhancedText.replace(
      new RegExp(`\\b${word}\\b`, 'gi'),
      `${emoji}`
    );
  });
  enhancedText = enhancedText.replace(/\$|\bUSD\b/gi, '₹');
  return enhancedText;
};

export const generateAnalysis = async (prompt) => {
  try {
    // First try to get product details from World Food Facts
    const productDetails = await fetchProductDetails(prompt);
    
    // Create a more detailed prompt with the fetched information
    const analysisPrompt = `Environmental Impact Analysis Request:
Product/Item: ${prompt}
${productDetails ? `
Additional Product Information:
- Eco-score: ${productDetails.ecoScore}
- Packaging: ${productDetails.packaging}
- Carbon Footprint: ${productDetails.carbonFootprint}
- Brand: ${productDetails.brand}
- Ingredients: ${productDetails.ingredients}
` : ''}

Provide a detailed environmental assessment of this specific product in EXACTLY this format:

IMPACT: [state main environmental concern in 5-7 words]
ECO1: [eco-friendly alternative name], ₹[price] - [key benefit]
ECO2: [budget-friendly alternative name], ₹[price] - [key benefit]
INGREDIENT: [key ingredient concern in 5-7 words]

Requirements:
- Keep all prices under ₹500
- Focus on local alternatives
- Be specific about environmental impacts
- Use exact format with labels
- Consider the product's actual ingredients and packaging
- For food items, focus on sustainable ingredients and eco-friendly packaging
- For non-food items, focus on manufacturing impact and recyclability
- Provide realistic alternatives that are actually available in the market
${productDetails ? '- Use the provided product information to give more accurate analysis' : ''}`;

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: analysisPrompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    if (!result?.response) {
      throw new Error('No response from API');
    }

    const text = result.response.text();
    const lines = text.split('\n').filter(line => line.trim());
    
    const getSection = (prefix, defaultValue) => {
      try {
        const line = lines.find(l => l.trim().toLowerCase().startsWith(prefix.toLowerCase()));
        if (!line) return defaultValue;
        const content = line.substring(line.indexOf(':') + 1).trim();
        return content || defaultValue;
      } catch (e) {
        console.error(`Error extracting ${prefix}:`, e);
        return defaultValue;
      }
    };

    const impactLine = getSection('IMPACT', 'Environmental impact assessment pending');
    const eco1Line = getSection('ECO1', 'Eco-friendly alternative unavailable');
    const eco2Line = getSection('ECO2', 'Budget-friendly option unavailable');
    const ingredientLine = getSection('INGREDIENT', 'Ingredient assessment pending');

    // Format currency
    const formatCurrency = (text) => {
      if (!text) return text;
      return text.replace(/\$|\bUSD\b/gi, '₹');
    };

    return {
      environmentalImpact: `🌍 ${formatHighlightedText(formatCurrency(impactLine), 'highlight')}`,
      budgetAlternatives: [` ${formatCurrency(eco1Line)}`, ` ${formatCurrency(eco2Line)}`],
      ingredientAnalysis: {
        sustainability: `🌿 ${formatHighlightedText(formatCurrency(ingredientLine), 'highlight')}`,
        additionalInfo: null
      },
      fullAnalysis: addEmojisToText(formatCurrency(text))
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      environmentalImpact: `🌍 Unable to analyze "${prompt}" - Please check product details and try again`,
      budgetAlternatives: [
        " Local market alternatives available",
        " Consider bulk purchase options"
      ],
      ingredientAnalysis: {
        sustainability: "🌿 Product analysis pending - Please rescan",
        additionalInfo: null
      },
      fullAnalysis: `Unable to generate analysis for "${prompt}". Please ensure the product details are clear and try scanning again.`
    };
  }
};
