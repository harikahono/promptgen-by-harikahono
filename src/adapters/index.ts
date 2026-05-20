// src/adapters/index.ts
import type { PromptGenerator } from './base';
import type { TargetTool } from '../types/portfolio';
import { claudeGenerator } from './claude';
import { lovableGenerator } from './lovable';
import { v0Generator } from './v0';

/**
 * Generator registry
 */
const generators: Record<TargetTool, PromptGenerator> = {
  claude: claudeGenerator,
  lovable: lovableGenerator,
  v0: v0Generator
};

/**
 * Get generator by target tool
 */
export function getGenerator(target: TargetTool): PromptGenerator {
  const generator = generators[target];
  if (!generator) {
    throw new Error(`JARVIS: Generator tidak ditemukan untuk target "${target}"`);
  }
  return generator;
}

/**
 * Get all available generators (untuk UI picker)
 */
export function getAllGenerators(): Array<{ id: TargetTool; name: string; icon: string }> {
  return Object.entries(generators).map(([id, gen]) => ({
    id: id as TargetTool,
    name: gen.targetName,
    icon: gen.targetIcon
  }));
}

// Re-export untuk convenience
export { claudeGenerator, lovableGenerator, v0Generator };
export type { PromptGenerator };