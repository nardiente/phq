import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';

interface FigmaStyle {
  key: string;
  name: string;
  type: 'TEXT' | 'FILL' | 'EFFECT' | 'GRID';
  description: string;
  style: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number | string;
    letterSpacing?: number;
    fills?: Array<{
      color: {
        r: number;
        g: number;
        b: number;
        a: number;
      }
    }>;
  };
}

interface TokenOutput {
  typography?: {
    [key: string]: {
      fontFamily: string;
      fontSize: number;
      fontWeight: number;
      lineHeight: number | string;
      letterSpacing: number;
    };
  };
  colors?: {
    [key: string]: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  };
}

dotenv.config();

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

async function getFigmaStyles() {
  try {
    if (!process.env.FIGMA_ACCESS_TOKEN || !process.env.FIGMA_FILE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const response = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_KEY}/styles`,
      {
        headers: {
          'X-Figma-Access-Token': process.env.FIGMA_ACCESS_TOKEN
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const tokens = transformToTokens(data.meta.styles);
    
    fs.writeFileSync(
      'src/styles/figma-tokens.json',
      JSON.stringify(tokens, null, 2)
    );

    console.log('✅ Successfully fetched and saved Figma tokens');
  } catch (error) {
    console.error('❌ Error fetching Figma tokens:', error);
    process.exit(1);
  }
}

function transformToTokens(styles: FigmaStyle[]): TokenOutput {
  return styles.reduce((acc: TokenOutput, style) => {
    const { name, type } = style;
    
    switch (type) {
      case 'TEXT':
        if (!acc.typography) acc.typography = {};
        acc.typography[name] = {
          fontFamily: style.style.fontFamily || '',
          fontSize: style.style.fontSize || 0,
          fontWeight: style.style.fontWeight || 400,
          lineHeight: style.style.lineHeight || 'normal',
          letterSpacing: style.style.letterSpacing || 0
        };
        break;
      
      case 'FILL':
        if (!acc.colors) acc.colors = {};
        if (style.style.fills?.[0]?.color) {
          acc.colors[name] = style.style.fills[0].color;
        }
        break;
    }
    
    return acc;
  }, {});
}

getFigmaStyles(); 