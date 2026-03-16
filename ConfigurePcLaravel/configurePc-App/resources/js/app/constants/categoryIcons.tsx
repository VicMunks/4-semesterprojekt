import type { ReactNode } from 'react';
import { Cpu, CircuitBoard, MemoryStick, Monitor, HardDrive, Zap, Box, Wind } from 'lucide-react';

export const categoryIcons: Record<string, ReactNode> = {
  cpu:         <Cpu size={16} />,
  motherboard: <CircuitBoard size={16} />,
  ram:         <MemoryStick size={16} />,
  gpu:         <Monitor size={16} />,
  storage:     <HardDrive size={16} />,
  psu:         <Zap size={16} />,
  case:        <Box size={16} />,
  cooling:     <Wind size={16} />,
};
