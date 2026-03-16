export type ComponentCategory = {
  id: string;
  name: string;
};

export type PCComponent = {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  price: number;
  powerDraw: number; // watts consumed
  specs: { label: string; value: string }[];
  // Compatibility fields
  socket?: string;            // CPU, Motherboard
  supportedSockets?: string[]; // Cooler
  ramType?: string;           // RAM: 'DDR4' | 'DDR5'
  supportedRamTypes?: string[]; // Motherboard
  formFactor?: string;        // Motherboard: 'ATX' | 'mATX' | 'ITX'
  supportedFormFactors?: string[]; // Case
  psuWattage?: number;        // PSU max wattage
  cpuTdp?: number;            // CPU thermal design power
  maxTdp?: number;            // Cooler max TDP supported
};

export const categories: ComponentCategory[] = [
  { id: 'cpu', name: 'CPU' },
  { id: 'motherboard', name: 'Motherboard' },
  { id: 'ram', name: 'RAM' },
  { id: 'gpu', name: 'GPU' },
  { id: 'storage', name: 'Storage' },
  { id: 'psu', name: 'PSU' },
  { id: 'case', name: 'Case' },
  { id: 'cooling', name: 'Cooling' },
];

export const allComponents: PCComponent[] = [
  // ─── CPU ────────────────────────────────────────────────────────────────────
  {
    id: 'cpu-1', categoryId: 'cpu', brand: 'AMD', name: 'Ryzen 5 7600X',
    price: 229, powerDraw: 105, cpuTdp: 105, socket: 'AM5',
    specs: [
      { label: 'Cores / Threads', value: '6C / 12T' },
      { label: 'Base / Boost', value: '4.7 / 5.3 GHz' },
      { label: 'Socket', value: 'AM5' },
      { label: 'RAM Support', value: 'DDR5' },
      { label: 'TDP', value: '105 W' },
    ],
  },
  {
    id: 'cpu-2', categoryId: 'cpu', brand: 'AMD', name: 'Ryzen 7 7800X3D',
    price: 389, powerDraw: 120, cpuTdp: 120, socket: 'AM5',
    specs: [
      { label: 'Cores / Threads', value: '8C / 16T' },
      { label: 'Base / Boost', value: '4.2 / 5.0 GHz' },
      { label: 'Socket', value: 'AM5' },
      { label: 'RAM Support', value: 'DDR5' },
      { label: 'TDP', value: '120 W' },
    ],
  },
  {
    id: 'cpu-3', categoryId: 'cpu', brand: 'Intel', name: 'Core i5-14600K',
    price: 259, powerDraw: 125, cpuTdp: 125, socket: 'LGA1700',
    specs: [
      { label: 'Cores / Threads', value: '14C / 20T' },
      { label: 'Base / Boost', value: '3.5 / 5.3 GHz' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'RAM Support', value: 'DDR4 / DDR5' },
      { label: 'TDP', value: '125 W' },
    ],
  },
  {
    id: 'cpu-4', categoryId: 'cpu', brand: 'Intel', name: 'Core i9-14900K',
    price: 529, powerDraw: 253, cpuTdp: 253, socket: 'LGA1700',
    specs: [
      { label: 'Cores / Threads', value: '24C / 32T' },
      { label: 'Base / Boost', value: '3.2 / 6.0 GHz' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'RAM Support', value: 'DDR4 / DDR5' },
      { label: 'TDP', value: '253 W' },
    ],
  },

  // ─── Motherboard ─────────────────────────────────────────────────────────────
  {
    id: 'mb-1', categoryId: 'motherboard', brand: 'ASUS', name: 'ROG Strix B650E-F',
    price: 299, powerDraw: 35, socket: 'AM5', formFactor: 'ATX', supportedRamTypes: ['DDR5'],
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Form Factor', value: 'ATX' },
      { label: 'RAM Slots', value: '4x DDR5' },
      { label: 'Max RAM', value: '128 GB' },
      { label: 'PCIe', value: 'x16 5.0' },
    ],
  },
  {
    id: 'mb-2', categoryId: 'motherboard', brand: 'MSI', name: 'MAG B650M Mortar',
    price: 189, powerDraw: 30, socket: 'AM5', formFactor: 'mATX', supportedRamTypes: ['DDR5'],
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Form Factor', value: 'mATX' },
      { label: 'RAM Slots', value: '4x DDR5' },
      { label: 'Max RAM', value: '128 GB' },
      { label: 'PCIe', value: 'x16 4.0' },
    ],
  },
  {
    id: 'mb-3', categoryId: 'motherboard', brand: 'ASUS', name: 'ROG Maximus Z790 Hero',
    price: 499, powerDraw: 40, socket: 'LGA1700', formFactor: 'ATX', supportedRamTypes: ['DDR5'],
    specs: [
      { label: 'Socket', value: 'LGA1700' },
      { label: 'Form Factor', value: 'ATX' },
      { label: 'RAM Slots', value: '4x DDR5' },
      { label: 'Max RAM', value: '192 GB' },
      { label: 'PCIe', value: 'x16 5.0' },
    ],
  },
  {
    id: 'mb-4', categoryId: 'motherboard', brand: 'Gigabyte', name: 'B760M DS3H',
    price: 139, powerDraw: 28, socket: 'LGA1700', formFactor: 'mATX', supportedRamTypes: ['DDR4', 'DDR5'],
    specs: [
      { label: 'Socket', value: 'LGA1700' },
      { label: 'Form Factor', value: 'mATX' },
      { label: 'RAM Slots', value: '4x DDR4/DDR5' },
      { label: 'Max RAM', value: '128 GB' },
      { label: 'PCIe', value: 'x16 4.0' },
    ],
  },

  // ─── RAM ─────────────────────────────────────────────────────────────────────
  {
    id: 'ram-1', categoryId: 'ram', brand: 'Corsair', name: 'Vengeance DDR5-6000 32GB',
    price: 89, powerDraw: 5, ramType: 'DDR5',
    specs: [
      { label: 'Type', value: 'DDR5' },
      { label: 'Speed', value: '6000 MHz' },
      { label: 'Capacity', value: '2 × 16 GB' },
      { label: 'Latency', value: 'CL30' },
    ],
  },
  {
    id: 'ram-2', categoryId: 'ram', brand: 'G.Skill', name: 'Trident Z5 DDR5-7200 32GB',
    price: 129, powerDraw: 5, ramType: 'DDR5',
    specs: [
      { label: 'Type', value: 'DDR5' },
      { label: 'Speed', value: '7200 MHz' },
      { label: 'Capacity', value: '2 × 16 GB' },
      { label: 'Latency', value: 'CL34' },
    ],
  },
  {
    id: 'ram-3', categoryId: 'ram', brand: 'Corsair', name: 'Vengeance DDR4-3600 32GB',
    price: 65, powerDraw: 4, ramType: 'DDR4',
    specs: [
      { label: 'Type', value: 'DDR4' },
      { label: 'Speed', value: '3600 MHz' },
      { label: 'Capacity', value: '2 × 16 GB' },
      { label: 'Latency', value: 'CL18' },
    ],
  },
  {
    id: 'ram-4', categoryId: 'ram', brand: 'Kingston', name: 'Fury Beast DDR4-3200 16GB',
    price: 45, powerDraw: 4, ramType: 'DDR4',
    specs: [
      { label: 'Type', value: 'DDR4' },
      { label: 'Speed', value: '3200 MHz' },
      { label: 'Capacity', value: '2 × 8 GB' },
      { label: 'Latency', value: 'CL16' },
    ],
  },

  // ─── GPU ─────────────────────────────────────────────────────────────────────
  {
    id: 'gpu-1', categoryId: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4060',
    price: 299, powerDraw: 115,
    specs: [
      { label: 'VRAM', value: '8 GB GDDR6' },
      { label: 'Boost Clock', value: '2460 MHz' },
      { label: 'TDP', value: '115 W' },
      { label: 'Outputs', value: 'HDMI 2.1, 3× DP' },
    ],
  },
  {
    id: 'gpu-2', categoryId: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4070',
    price: 599, powerDraw: 200,
    specs: [
      { label: 'VRAM', value: '12 GB GDDR6X' },
      { label: 'Boost Clock', value: '2475 MHz' },
      { label: 'TDP', value: '200 W' },
      { label: 'Outputs', value: 'HDMI 2.1, 3× DP' },
    ],
  },
  {
    id: 'gpu-3', categoryId: 'gpu', brand: 'AMD', name: 'Radeon RX 7800 XT',
    price: 499, powerDraw: 263,
    specs: [
      { label: 'VRAM', value: '16 GB GDDR6' },
      { label: 'Boost Clock', value: '2430 MHz' },
      { label: 'TDP', value: '263 W' },
      { label: 'Outputs', value: 'HDMI 2.1, 2× DP, USB-C' },
    ],
  },
  {
    id: 'gpu-4', categoryId: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4090',
    price: 1599, powerDraw: 450,
    specs: [
      { label: 'VRAM', value: '24 GB GDDR6X' },
      { label: 'Boost Clock', value: '2520 MHz' },
      { label: 'TDP', value: '450 W' },
      { label: 'Outputs', value: 'HDMI 2.1, 3× DP' },
    ],
  },

  // ─── Storage ─────────────────────────────────────────────────────────────────
  {
    id: 'ssd-1', categoryId: 'storage', brand: 'Samsung', name: '990 Pro 1TB NVMe',
    price: 99, powerDraw: 5,
    specs: [
      { label: 'Type', value: 'NVMe PCIe 4.0' },
      { label: 'Capacity', value: '1 TB' },
      { label: 'Read / Write', value: '7450 / 6900 MB/s' },
    ],
  },
  {
    id: 'ssd-2', categoryId: 'storage', brand: 'WD', name: 'Black SN850X 2TB',
    price: 169, powerDraw: 7,
    specs: [
      { label: 'Type', value: 'NVMe PCIe 4.0' },
      { label: 'Capacity', value: '2 TB' },
      { label: 'Read / Write', value: '7300 / 6600 MB/s' },
    ],
  },
  {
    id: 'ssd-3', categoryId: 'storage', brand: 'Seagate', name: 'Barracuda 4TB HDD',
    price: 79, powerDraw: 8,
    specs: [
      { label: 'Type', value: 'SATA HDD' },
      { label: 'Capacity', value: '4 TB' },
      { label: 'Speed', value: '7200 RPM' },
    ],
  },

  // ─── PSU ─────────────────────────────────────────────────────────────────────
  {
    id: 'psu-1', categoryId: 'psu', brand: 'Seasonic', name: 'Focus GX 650W',
    price: 99, powerDraw: 0, psuWattage: 650,
    specs: [
      { label: 'Wattage', value: '650 W' },
      { label: 'Efficiency', value: '80+ Gold' },
      { label: 'Modular', value: 'Fully Modular' },
    ],
  },
  {
    id: 'psu-2', categoryId: 'psu', brand: 'Corsair', name: 'RM750 750W',
    price: 119, powerDraw: 0, psuWattage: 750,
    specs: [
      { label: 'Wattage', value: '750 W' },
      { label: 'Efficiency', value: '80+ Gold' },
      { label: 'Modular', value: 'Fully Modular' },
    ],
  },
  {
    id: 'psu-3', categoryId: 'psu', brand: 'EVGA', name: 'SuperNOVA 850W G6',
    price: 149, powerDraw: 0, psuWattage: 850,
    specs: [
      { label: 'Wattage', value: '850 W' },
      { label: 'Efficiency', value: '80+ Gold' },
      { label: 'Modular', value: 'Fully Modular' },
    ],
  },
  {
    id: 'psu-4', categoryId: 'psu', brand: 'be quiet!', name: 'Straight Power 1000W',
    price: 199, powerDraw: 0, psuWattage: 1000,
    specs: [
      { label: 'Wattage', value: '1000 W' },
      { label: 'Efficiency', value: '80+ Platinum' },
      { label: 'Modular', value: 'Fully Modular' },
    ],
  },

  // ─── Case ─────────────────────────────────────────────────────────────────────
  {
    id: 'case-1', categoryId: 'case', brand: 'Fractal Design', name: 'Meshify C',
    price: 99, powerDraw: 0, supportedFormFactors: ['ATX', 'mATX'],
    specs: [
      { label: 'Supported MB', value: 'ATX, mATX' },
      { label: 'Drive Bays', value: '2× 3.5" + 3× 2.5"' },
      { label: 'Fan Support', value: 'Up to 360mm rad' },
    ],
  },
  {
    id: 'case-2', categoryId: 'case', brand: 'Lian Li', name: 'PC-O11 Dynamic',
    price: 149, powerDraw: 0, supportedFormFactors: ['ATX'],
    specs: [
      { label: 'Supported MB', value: 'ATX only' },
      { label: 'Drive Bays', value: '6× 2.5"' },
      { label: 'Fan Support', value: 'Up to 360mm rad × 2' },
    ],
  },
  {
    id: 'case-3', categoryId: 'case', brand: 'NZXT', name: 'H510',
    price: 89, powerDraw: 0, supportedFormFactors: ['ATX', 'mATX'],
    specs: [
      { label: 'Supported MB', value: 'ATX, mATX' },
      { label: 'Drive Bays', value: '2× 3.5" + 2× 2.5"' },
      { label: 'Fan Support', value: 'Up to 240mm rad' },
    ],
  },
  {
    id: 'case-4', categoryId: 'case', brand: 'Cooler Master', name: 'NR200P',
    price: 79, powerDraw: 0, supportedFormFactors: ['mATX', 'ITX'],
    specs: [
      { label: 'Supported MB', value: 'mATX, ITX' },
      { label: 'Drive Bays', value: '1× 3.5" + 2× 2.5"' },
      { label: 'Fan Support', value: 'Up to 280mm rad' },
    ],
  },

  // ─── Cooling ─────────────────────────────────────────────────────────────────
  {
    id: 'cool-1', categoryId: 'cooling', brand: 'Noctua', name: 'NH-D15',
    price: 99, powerDraw: 2, supportedSockets: ['AM4', 'AM5', 'LGA1700'], maxTdp: 250,
    specs: [
      { label: 'Type', value: 'Air Cooler' },
      { label: 'Fan Size', value: '2× 140mm' },
      { label: 'Max TDP', value: '250 W' },
      { label: 'Sockets', value: 'AM4/AM5, LGA1700' },
    ],
  },
  {
    id: 'cool-2', categoryId: 'cooling', brand: 'be quiet!', name: 'Dark Rock Pro 4',
    price: 89, powerDraw: 2, supportedSockets: ['AM4', 'AM5', 'LGA1700'], maxTdp: 250,
    specs: [
      { label: 'Type', value: 'Air Cooler' },
      { label: 'Fan Size', value: '1× 135mm + 1× 120mm' },
      { label: 'Max TDP', value: '250 W' },
      { label: 'Sockets', value: 'AM4/AM5, LGA1700' },
    ],
  },
  {
    id: 'cool-3', categoryId: 'cooling', brand: 'Corsair', name: 'iCUE H150i 360mm AIO',
    price: 159, powerDraw: 10, supportedSockets: ['AM4', 'AM5', 'LGA1700'], maxTdp: 350,
    specs: [
      { label: 'Type', value: '360mm AIO Liquid' },
      { label: 'Fan Size', value: '3× 120mm' },
      { label: 'Max TDP', value: '350 W' },
      { label: 'Sockets', value: 'AM4/AM5, LGA1700' },
    ],
  },
  {
    id: 'cool-4', categoryId: 'cooling', brand: 'DeepCool', name: 'AK400',
    price: 39, powerDraw: 2, supportedSockets: ['AM4', 'AM5', 'LGA1700'], maxTdp: 220,
    specs: [
      { label: 'Type', value: 'Air Cooler' },
      { label: 'Fan Size', value: '1× 120mm' },
      { label: 'Max TDP', value: '220 W' },
      { label: 'Sockets', value: 'AM4/AM5, LGA1700' },
    ],
  },
];

export function getTotalPowerDraw(selected: Record<string, PCComponent | null>): number {
  return Object.values(selected).reduce((sum, c) => sum + (c?.powerDraw ?? 0), 0);
}

export function checkCompatibility(
  component: PCComponent,
  selected: Record<string, PCComponent | null>
): { compatible: boolean; reasons: string[] } {
  const reasons: string[] = [];

  const cpu = selected['cpu'];
  const mb = selected['motherboard'];
  const ram = selected['ram'];
  const cooler = selected['cooling'];
  const caseComp = selected['case'];
  const psu = selected['psu'];

  switch (component.categoryId) {
    case 'cpu': {
      if (mb && mb.socket !== component.socket) {
        reasons.push(`Requires socket ${component.socket}, motherboard has ${mb.socket}`);
      }
      if (cooler && !cooler.supportedSockets?.includes(component.socket!)) {
        reasons.push(`Cooler does not support socket ${component.socket}`);
      }
      if (cooler && component.cpuTdp && cooler.maxTdp && cooler.maxTdp < component.cpuTdp) {
        reasons.push(`CPU TDP ${component.cpuTdp}W exceeds cooler max TDP ${cooler.maxTdp}W`);
      }
      break;
    }
    case 'motherboard': {
      if (cpu && cpu.socket !== component.socket) {
        reasons.push(`CPU requires socket ${cpu.socket}, this motherboard has ${component.socket}`);
      }
      if (ram && !component.supportedRamTypes?.includes(ram.ramType!)) {
        reasons.push(`RAM type ${ram.ramType} not supported — motherboard supports ${component.supportedRamTypes?.join('/')}`);
      }
      if (caseComp && !caseComp.supportedFormFactors?.includes(component.formFactor!)) {
        reasons.push(`Case does not support ${component.formFactor} form factor`);
      }
      if (cooler && cpu && !cooler.supportedSockets?.includes(component.socket!)) {
        reasons.push(`Cooler does not support socket ${component.socket}`);
      }
      break;
    }
    case 'ram': {
      if (mb && !mb.supportedRamTypes?.includes(component.ramType!)) {
        reasons.push(`Motherboard supports ${mb.supportedRamTypes?.join('/')}, RAM is ${component.ramType}`);
      }
      break;
    }
    case 'cooling': {
      if (cpu && !component.supportedSockets?.includes(cpu.socket!)) {
        reasons.push(`Cooler does not support CPU socket ${cpu.socket}`);
      }
      if (cpu && cpu.cpuTdp && component.maxTdp && component.maxTdp < cpu.cpuTdp) {
        reasons.push(`CPU TDP ${cpu.cpuTdp}W exceeds cooler max TDP ${component.maxTdp}W`);
      }
      if (mb && !component.supportedSockets?.includes(mb.socket!)) {
        reasons.push(`Cooler does not support socket ${mb.socket}`);
      }
      break;
    }
    case 'case': {
      if (mb && !component.supportedFormFactors?.includes(mb.formFactor!)) {
        reasons.push(`Case supports ${component.supportedFormFactors?.join('/')}, motherboard is ${mb.formFactor}`);
      }
      break;
    }
    case 'psu': {
      const totalWithThisRemoved = getTotalPowerDraw({ ...selected, psu: null });
      if (component.psuWattage && component.psuWattage < totalWithThisRemoved) {
        reasons.push(`${component.psuWattage}W PSU is insufficient — build draws ${totalWithThisRemoved}W`);
      }
      break;
    }
    default:
      break;
  }

  // General PSU check for non-PSU components
  if (component.categoryId !== 'psu' && psu) {
    const totalWithNew = getTotalPowerDraw({ ...selected, [component.categoryId]: component });
    if (psu.psuWattage && psu.psuWattage < totalWithNew) {
      reasons.push(`Total power draw ${totalWithNew}W exceeds PSU capacity ${psu.psuWattage}W`);
    }
  }

  return { compatible: reasons.length === 0, reasons };
}
