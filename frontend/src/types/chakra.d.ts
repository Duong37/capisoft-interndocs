import { ReactNode } from 'react';

declare module '@chakra-ui/react' {
  // Field components
  interface FieldLabelProps {
    children?: ReactNode;
    [key: string]: any; // Allow any Chakra style props
  }

  // Select components
  interface SelectLabelProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface SelectControlProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface SelectTriggerProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface SelectValueTextProps {
    placeholder?: string;
    [key: string]: any;
  }

  interface SelectPositionerProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface SelectContentProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface SelectItemProps {
    children?: ReactNode;
    [key: string]: any;
  }

  // Drawer components
  interface DrawerPositionerProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface DrawerContentProps {
    children?: ReactNode;
    [key: string]: any;
  }

  interface DrawerBodyProps {
    children?: ReactNode;
    [key: string]: any;
  }

  // Link component - allow 'to' prop when using with RouterLink
  interface LinkProps {
    to?: string;
    [key: string]: any;
  }

  // Stack components
  interface StackProps {
    spacing?: number;
    [key: string]: any;
  }
}

