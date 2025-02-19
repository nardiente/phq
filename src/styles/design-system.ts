// Create a design system layer
export const designSystem = {
  components: {
    Button: {
      base: "px-4 py-2 rounded-lg font-medium",
      primary: "bg-primary-600 text-white hover:bg-primary-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    },
    Card: {
      base: "bg-white rounded-lg shadow-sm border border-gray-200",
      padding: "p-4"
    }
  }
} 