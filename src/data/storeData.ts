export interface StoreProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  icon: string;
  tag: string;
  description: string;
}

export interface CartItem extends StoreProduct {
  qty: number;
}

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: 'Housekeeping',
    name: 'Housekeeping',
    icon: '🧹',
    description: 'Cleaning & facility products',
  },
  {
    id: 'Uniforms',
    name: 'Uniforms & Workwear',
    icon: '👕',
    description: 'Staff uniforms & safety wear',
  },
  {
    id: 'IT',
    name: 'IT & Laptops',
    icon: '💻',
    description: 'Computers & accessories',
  },
  {
    id: 'Biometric',
    name: 'Biometric & Security',
    icon: '🔐',
    description: 'Attendance & access control',
  },
  {
    id: 'Corporate Gifts',
    name: 'Corporate Gifts',
    icon: '🎁',
    description: 'Branded business gifts',
  },
  {
    id: 'Joining Kits',
    name: 'Employee Joining Kits',
    icon: '🎒',
    description: 'Welcome & onboarding kits',
  },
  {
    id: 'Safety',
    name: 'Safety Products',
    icon: '⛑️',
    description: 'PPE & workplace safety',
  },
  {
    id: 'Office',
    name: 'Office Supplies',
    icon: '📋',
    description: 'Stationery & workplace products',
  },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 1,
    name: 'Professional Floor Cleaner 5 Litre',
    category: 'Housekeeping',
    price: 650,
    icon: '🧴',
    tag: 'POPULAR',
    description: 'Commercial floor cleaning solution.',
  },
  {
    id: 2,
    name: 'Microfiber Cleaning Mop',
    category: 'Housekeeping',
    price: 399,
    icon: '🧹',
    tag: 'BEST SELLER',
    description: 'Reusable microfiber commercial mop.',
  },
  {
    id: 3,
    name: 'Heavy Duty Garbage Bin 60L',
    category: 'Housekeeping',
    price: 1299,
    icon: '🗑️',
    tag: 'BUSINESS',
    description: 'Durable workplace waste bin.',
  },
  {
    id: 4,
    name: 'Housekeeping Staff Uniform',
    category: 'Uniforms',
    price: 799,
    icon: '👕',
    tag: 'CUSTOM',
    description: 'Customizable housekeeping uniform.',
  },
  {
    id: 5,
    name: 'Security Guard Uniform',
    category: 'Uniforms',
    price: 999,
    icon: '🥋',
    tag: 'CUSTOM',
    description: 'Professional security workwear.',
  },
  {
    id: 6,
    name: 'Safety Reflective Jacket',
    category: 'Safety',
    price: 299,
    icon: '🦺',
    tag: 'SAFETY',
    description: 'High visibility reflective workwear.',
  },
  {
    id: 7,
    name: 'Business Laptop 15.6 inch',
    category: 'IT',
    price: 45999,
    icon: '💻',
    tag: 'IT',
    description: 'Business productivity laptop.',
  },
  {
    id: 8,
    name: 'Wireless Keyboard & Mouse',
    category: 'IT',
    price: 1199,
    icon: '⌨️',
    tag: 'OFFICE',
    description: 'Wireless desktop keyboard and mouse.',
  },
  {
    id: 9,
    name: '24 inch Business Monitor',
    category: 'IT',
    price: 8999,
    icon: '🖥️',
    tag: 'IT',
    description: 'Full HD business monitor.',
  },
  {
    id: 10,
    name: 'Fingerprint Biometric Attendance',
    category: 'Biometric',
    price: 4999,
    icon: '🔐',
    tag: 'POPULAR',
    description: 'Employee fingerprint attendance device.',
  },
  {
    id: 11,
    name: 'Face Recognition Attendance System',
    category: 'Biometric',
    price: 8999,
    icon: '📷',
    tag: 'BUSINESS',
    description: 'Face recognition attendance solution.',
  },
  {
    id: 12,
    name: 'RFID Employee ID Card',
    category: 'Biometric',
    price: 99,
    icon: '🪪',
    tag: 'BULK',
    description: 'RFID-enabled employee access card.',
  },
  {
    id: 13,
    name: 'Corporate Notebook',
    category: 'Corporate Gifts',
    price: 149,
    icon: '📓',
    tag: 'BRANDING',
    description: 'Custom company logo notebook.',
  },
  {
    id: 14,
    name: 'Corporate Gift Mug',
    category: 'Corporate Gifts',
    price: 199,
    icon: '☕',
    tag: 'CUSTOM',
    description: 'Branded corporate coffee mug.',
  },
  {
    id: 15,
    name: 'Corporate Backpack',
    category: 'Corporate Gifts',
    price: 699,
    icon: '🎒',
    tag: 'POPULAR',
    description: 'Custom branded office backpack.',
  },
  {
    id: 16,
    name: 'Employee Joining Kit',
    category: 'Joining Kits',
    price: 799,
    icon: '🎁',
    tag: 'CORPORATE',
    description: 'Customized employee welcome kit.',
  },
  {
    id: 17,
    name: 'Employee ID Card & Lanyard',
    category: 'Joining Kits',
    price: 129,
    icon: '🪪',
    tag: 'BULK',
    description: 'Professional employee identification kit.',
  },
  {
    id: 18,
    name: 'Safety Helmet',
    category: 'Safety',
    price: 299,
    icon: '⛑️',
    tag: 'SAFETY',
    description: 'Industrial safety helmet.',
  },
  {
    id: 19,
    name: 'Safety Shoes',
    category: 'Safety',
    price: 899,
    icon: '🥾',
    tag: 'WORKWEAR',
    description: 'Industrial protective safety footwear.',
  },
  {
    id: 20,
    name: 'Office Stationery Kit',
    category: 'Office',
    price: 499,
    icon: '📋',
    tag: 'OFFICE',
    description: 'Essential office stationery set.',
  },
  {
    id: 21,
    name: 'A4 Copier Paper Box',
    category: 'Office',
    price: 2999,
    icon: '📄',
    tag: 'OFFICE',
    description: 'Business-use copier paper.',
  },
  {
    id: 22,
    name: 'Branded Executive Pen',
    category: 'Corporate Gifts',
    price: 99,
    icon: '🖊️',
    tag: 'BULK',
    description: 'Corporate promotional pen.',
  },
];

export const SAMPLE_JOINING_KIT_ITEMS = [
  '📁 Joining Folder',
  '📓 Company Notebook',
  '🖊️ Branded Pen',
  '🪪 Employee ID Card',
  '🎒 Laptop / Backpack',
  '👕 Company T-Shirt',
  '☕ Branded Mug',
  '📄 Employee Handbook',
  '🔑 ID Card Lanyard',
  '🎁 Welcome Gift',
];
