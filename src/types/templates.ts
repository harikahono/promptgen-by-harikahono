// src/types/templates.ts
import type { PortfolioData, TargetTool } from './portfolio';

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  targetTool: TargetTool;
  data: PortfolioData;
}
