import React, { useState, FC } from 'react';
import { DesignSystemProvider, useDesignSystem } from './DesignSystemContext';
import { Badge, BadgeSizes, BadgeShapes, BadgeColorVariantColumn, SoftBadgeColorVariantColumn, SolidBadgeColorVariantColumn, InlineElements, InlineWithIcons, NumberBadges, ButtonGroup, Button, ButtonIcons, ButtonSizes, ButtonShapes, Accordions } from './ui';

interface BaseButtonProps {
 children?: React.ReactNode;
 className?: string;
 onClick?: () => void;
 size?: 'xsmall' | 'small' | 'default' | 'large';
 variant?: 'solid' | 'outlined' | 'ghost' | 'soft' | 'link' | 'white';
}

const BaseButton: FC<BaseButtonProps> = ({ children = 'Button', className = '', onClick, size = 'default', variant = 'solid' }) => {
 const { theme } = useDesignSystem();
 let sizeClasses = '';

 switch (size) {
  case 'xsmall':
   sizeClasses = 'w-16 text-xs';
   break;
  case 'small':
   sizeClasses = 'w-20 text-sm';
   break;
  case 'default':
   sizeClasses = 'w-24 text-base';
   break;
  case 'large':
   sizeClasses = 'w-28 text-lg';
   break;
 }

 const variantClasses = {
  solid: `bg-primary-400 text-white hover:bg-primary-500`,
  outlined: `border border-primary-400 text-primary-400 bg-white hover:bg-primary-10`,
  ghost: 'text-neutral-400 hover:bg-primary-10',
  soft: 'bg-primary-10 text-primary-400 hover:bg-primary-50',
  link: 'text-info-500 hover:text-info-600',
  white: 'bg-white text-neutral-500 border border-neutral-100 hover:bg-neutral-50'
 };

 return (
  <button
   onClick={onClick}
   className={`
       flex items-center justify-center
       font-medium
       rounded-DEFAULT
       transition-all duration-150
       focus:outline-none focus:ring-2 focus:ring-primary-200
       active:scale-[0.98]
       ${sizeClasses}
       ${variantClasses[variant]}
       ${className}
     `}
  >
   {children}
  </button>
 );
};

const ButtonComponent: FC<BaseButtonProps> = (props) => {
 return <BaseButton {...props} />;
};

const DesignSystem = () => {
 const theme = {
  colors: {
   primary: {
    400: '#5A00CD',
    500: '#44009A',
   },
   neutral: {
    400: '#475569',
   },
  },
  fontFamily: {
   sans: ['Satoshi Variable', 'sans-serif'],
  },
  borderRadius: {
   DEFAULT: '6px',
  },
 };

 // Define tab data
 const [activeTab, setActiveTab] = useState(0);
 const tabs = [
  {
   label: 'Buttons',
   component: (
    <>
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Buttons</h2>

      <div className="space-y-8">
       {/* Variants */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Variants</h3>
        <div className="flex gap-4">
         <ButtonComponent variant="solid">Solid</ButtonComponent>
         <ButtonComponent variant="outlined">Outline</ButtonComponent>
         <ButtonComponent variant="ghost">Ghost</ButtonComponent>
         <ButtonComponent variant="soft">Soft</ButtonComponent>
         <ButtonComponent variant="link">Link</ButtonComponent>
         <ButtonComponent variant="white">White</ButtonComponent>
        </div>
       </div>

       {/* Sizes */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Sizes</h3>
        <div className="flex flex-row gap-10">
         <div className="w-fit">
          <h6 className="text-[15px] font-medium text-[#475566] tracking-[-0.4px]">
           Small
          </h6>
          <ButtonComponent size="small">
           Button-sm
          </ButtonComponent>
         </div>

         <div className="w-fit">
          <h6 className="text-[15px] font-medium text-[#475566] tracking-[-0.4px]">
           Default
          </h6>
          <ButtonComponent size="default">
           Button
          </ButtonComponent>
         </div>

         <div className="w-fit">
          <h6 className="text-[15px] font-medium text-[#475566] tracking-[-0.4px]">
           Large
          </h6>
          <ButtonComponent size="large">
           Button-lg
          </ButtonComponent>
         </div>
        </div>
       </div>

       {/* Button Group */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Button Group</h3>
        <ButtonGroup />
       </div>

       {/* Button Icons */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Button Icons</h3>
        <ButtonIcons />
       </div>

       {/* Button Sizes */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Button Sizes</h3>
        <ButtonSizes />
       </div>

       {/* Button Shapes */}
       <div>
        <h3 className="text-lg font-medium text-[#475569] mb-4">Button Shapes</h3>
        <ButtonShapes />
       </div>
      </div>
     </section>
    </>
   ),
  },
  {
   label: 'Accordions',
   component: (
    <section className="mb-12">
     <h2 className="text-lg font-semibold mb-6">Accordions</h2>
     <Accordions />
    </section>
   ),
  },
  {
   label: 'Badges',
   component: (
    <>
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Badges</h2>
      <div className="flex flex-wrap gap-9">
       {/* Types - White */}
       <div className="flex flex-col space-y-4">
        <h6 className="text-sm font-medium text-[#475469]">White</h6>
        <Badge variant="white">Badge</Badge>
       </div>

       {/* Types - Outlined */}
       <div className="flex flex-col space-y-4">
        <h6 className="text-sm font-medium text-[#475469]">Outlined</h6>
        <Badge variant="outlined">Badge</Badge>
       </div>

       {/* Types - Soft */}
       <div className="flex flex-col space-y-4">
        <h6 className="text-sm font-medium text-[#475469]">Soft</h6>
        <Badge variant="soft">Badge</Badge>
       </div>

       {/* Types - Solid */}
       <div className="flex flex-col space-y-4">
        <h6 className="text-sm font-medium text-[#475469]">Solid</h6>
        <Badge variant="solid">Badge</Badge>
       </div>
      </div>
     </section>

     {/* Badge Sizes */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Badge Sizes</h2>
      <div className="flex space-x-9 w-full max-w-[522px] h-[66px]">
       {/* Small */}
       <div className="flex flex-col space-y-4 w-[150px] h-full">
        <div className="text-[15px] font-medium text-[#47556A] leading-[20px] tracking-[-0.4px]">
         Small
        </div>
        <BadgeSizes size="sm">Badge-sm</BadgeSizes>
       </div>

       {/* Default */}
       <div className="flex flex-col space-y-4 w-[150px] h-full">
        <div className="text-[15px] font-medium text-[#47556A] leading-[20px] tracking-[-0.4px]">
         Default
        </div>
        <BadgeSizes size="DEFAULT">Badge</BadgeSizes>
       </div>

       {/* Large */}
       <div className="flex flex-col space-y-4 w-[150px] h-full">
        <div className="text-[15px] font-medium text-[#47556A] leading-[20px] tracking-[-0.4px]">
         Large
        </div>
        <BadgeSizes size="lg">Badge-lg</BadgeSizes>
       </div>
      </div>
     </section>

     {/* Badge Shapes */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Badge Shapes</h2>
      <BadgeShapes />
     </section>

     {/* Color Variants */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Color Variants</h2>
      <div className="flex space-x-9 w-full max-w-[522px]">
       <BadgeColorVariantColumn />
       <SoftBadgeColorVariantColumn />
       <SolidBadgeColorVariantColumn />
      </div>
     </section>

     {/* Inline Elements */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Inline Elements</h2>
      <InlineElements />
     </section>

     {/* Inline Elements with Icons */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Inline Elements with Icons</h2>
      <InlineWithIcons />
     </section>

     {/* Number Badges */}
     <section className="mb-12">
      <h2 className="text-lg font-semibold mb-6">Number Badges</h2>
      <NumberBadges />
     </section>
    </>
   ),
  },
 ];

 return (
  <DesignSystemProvider value={{ theme }}>
   <div className="p-8 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-12">Design System</h1>

    {/* Tab Navigation */}
    <nav className="mb-8">
     <ul className="flex space-x-4">
      {tabs.map((tab, index) => (
       <li key={index}>
        <button
         className={`
                        px-4 py-2 rounded-md
                        ${activeTab === index
           ? 'bg-primary-100 text-primary-700 font-semibold'
           : 'text-neutral-500 hover:text-neutral-700'
          }
                    `}
         onClick={() => setActiveTab(index)}
        >
         {tab.label}
        </button>
       </li>
      ))}
     </ul>
    </nav>

    {/* Tab Content */}
    <div>{tabs[activeTab].component}</div>
   </div>
  </DesignSystemProvider>
 );
};

export default DesignSystem;