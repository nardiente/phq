# **PRIORITY 1: KEEP IT SIMPLE**

## **STOP THESE PATTERNS IMMEDIATELY:**

1. OVER-ENGINEERING FROM THE START
2. ADDING COMPLEXITY TO FIX COMPLEXITY
3. WRITING "CLEVER" CODE INSTEAD OF CLEAR CODE
4. TRYING TO FUTURE-PROOF WITH UNNECESSARY ABSTRACTIONS

## **DO THIS INSTEAD:**

1. START WITH THE SIMPLEST POSSIBLE SOLUTION
2. GET BASIC FUNCTIONALITY WORKING FIRST
3. ONLY ADD COMPLEXITY WHEN ABSOLUTELY NEEDED
4. KEEP CODE READABLE AND MAINTAINABLE

### Example of Simple vs Complex:

```typescript
// GOOD: Simple and clear
const PopoverWidget = ({ config }: { config: WidgetConfig }) => (
  <div style={{ top: config.placement === 'Top' ? '16px' : 'auto' }}>
    <WidgetContent config={config} />
  </div>
);

// BAD: Over-engineered
const PopoverWidget = ({ config }: { config: WidgetConfig }) => {
  const position = calculateDynamicPosition(config.placement);
  const offset = validateOffset(config.offset);
  return (
    <div style={generatePositionStyles(position, offset)}>
      <WidgetContent config={config} />
    </div>
  );
};
```

### When Adding Features:

1. Does this feature solve an immediate problem?
2. Is this the simplest way to implement it?
3. Are we adding complexity just in case we need it later?
4. Can we remove any existing complexity?

**REMEMBER: COMPLEXITY IS THE ROOT OF MOST BUGS AND MAINTENANCE ISSUES**

---

# Application Architecture

## When Things Break Repeatedly

1. Root Cause Analysis:

   - Document where and why it broke
   - Identify what made it fragile
   - Look for patterns in breakages
     Example:

   ```
   Issue: Tab positioning breaks frequently
   Cause: Complex nested positioning logic
   Fix: Simplified to single container + direct positioning
   ```

2. Prevention Strategy:

   - Keep positioning logic in ONE place
   - Avoid nested containers that affect positioning
   - Use simple, direct styles over complex calculations
   - Document working solutions in code comments

3. Fix Checklist:

   - Is this the simplest possible solution?
   - Could nested containers cause issues?
   - Are we repeating logic that should be centralized?
   - Have we documented why this solution works?

4. Signs Code is Too Complex:

   - Nested containers affecting layout
   - Multiple components controlling the same thing
   - Complex style calculations
   - Features that break when other features change
   - Hard to predict side effects

5. Breaking Changes Pattern:
   - If fixing A breaks B and C, A is too coupled
   - Components should have clear boundaries
   - Positioning logic belongs in ONE place
   - Document dependencies between components
     Example:
   ```
   Widget Positioning Dependencies:
   - PopoverWidget handles its own placement
   - ModalWidget centers itself
   - SidebarWidget sticks to sides
   ```

## Code Simplicity - Our Top Priority

1. Write the Simplest Possible Code:

   - If it looks complicated, it is complicated
   - Fewer lines of code = fewer bugs
   - Ask "Could this be simpler?"
     Example (Bad):

   ```typescript
   interface CheckboxProps {
     checked: boolean;
     setChecked: (checked: boolean) => void;
     label: ReactNode;
   }

   export const Checkbox = ({ checked, setChecked, label }: CheckboxProps) => {
     return (
       <label className="flex items-center gap-2 cursor-pointer">
         <input
           type="checkbox"
           checked={checked}
           onChange={(e) => setChecked(e.target.checked)}
           className={`rounded border-gray-300 ${checked ? 'bg-purple-600' : ''}`}
         />
         <span className="text-sm text-gray-700">{label}</span>
       </label>
     );
   };
   ```

   Example (Good):

   ```typescript
   export const Checkbox = ({ checked, onChange, label }: {
     checked: boolean;
     onChange: (checked: boolean) => void;
     label: string;
   }) => (
     <label className="flex gap-2">
       <input
         type="checkbox"
         checked={checked}
         onChange={e => onChange(e.target.checked)}
         className="accent-[#5a00cd]"
       />
       {label}
     </label>
   );
   ```

2. Simplicity Guidelines:

   - Use browser defaults when possible
   - Inline simple interfaces
   - Remove unnecessary styling
   - Fewer props = better
   - If a component is over 50 lines, it's probably doing too much

3. Before Adding Code, Ask:

   - "Do we really need this?"
   - "Is there a simpler way?"
   - "What's the maintenance cost?"
   - "Are we repeating something that exists?"

4. Code Review Checklist:
   - Could this be shorter?
   - Are we overengineering?
   - Is every line necessary?
   - Are we using complex patterns unnecessarily?

## Core Principles

1. Predictable Data Flow:

   - One-way data flow from parent to child
   - Single source of truth for state
   - Consistent update patterns across all features

2. Component Design:

   - Components own their constraints and boundaries
   - Content never leaks outside containers
   - Validation happens at the right level
     Example (Widget Preview):

   ```typescript
   // Parent handles layout/positioning
   <WidgetPreview>
     // Child handles internal constraints
     <PopoverWidget />
   </WidgetPreview>
   ```

3. Feature Implementation:
   - Follow existing patterns
   - Keep logic at appropriate levels
   - Test impact across related features

## Development Standards

1. Before Adding Features:

   - Map data flow and dependencies
   - Identify similar existing features
   - Plan for edge cases

2. During Development:

   - Use console.logs for data flow tracking
   - Test against related features
   - Maintain component boundaries

3. Code Organization:
   ```
   src/
   ├── components/          # Reusable components
   │   ├── common/         # Shared UI components
   │   └── features/       # Feature-specific components
   ├── pages/              # Route components
   ├── services/           # API/data services
   └── types/              # TypeScript definitions
   ```

## Preventing Regressions

1. Feature Boundaries:

   - Components must handle their constraints
   - Data flow must be traceable
   - Changes must not leak across features

2. Testing Strategy:
   - Test new features against related ones
   - Verify core functionality
   - Check edge cases

## Example Implementation: Widgets

The widget system demonstrates these principles:

## Component Structure

- One component = one responsibility
- Keep component hierarchy flat where possible
- Components should be dumb/presentational by default
- Lift state up only when needed

## Debugging Checklist

1. Data Flow Issues:

   - Check console.log in handleConfigUpdate
   - Verify localStorage content
   - Confirm API request/response

2. UI Issues:

   - Check component rendering order
   - Verify prop values at each level
   - Inspect CSS hierarchy

3. State Issues:
   - Single source of truth?
   - Using correct update handler?
   - State initialized properly?

## State Management

- Use localStorage for temporary edit state ('editingWidget')
- Widget updates use PUT with existing ID
- New widgets use POST with generated ID
- Never mutate widget config directly, use handleConfigUpdate

## Development Process

1. Before Coding:

   - Check existing patterns first
   - Identify data flow path
   - Plan component responsibilities

2. While Coding:

   - Start with working example (copy pattern)
   - Add console.logs for data flow
   - Test edge cases immediately

3. Code Review:
   - Matches existing patterns?
   - Single responsibility?
   - Could this be simpler?

## Data Flow & Validation

- Form inputs (WidgetsSidebar.tsx) show validation UI but don't prevent invalid values
- Actual validation/constraints happen in WidgetPreview/index.tsx
- Widget components (PopoverWidget, ModalWidget, etc.) should only handle rendering, not positioning or validation

## Widget Preview

- Preview should update in real-time as form values change
- Always fall back to default values if config is invalid
- Preview component handles all validation and constraints
- Use consistent default values across components
- Widget content must stay within its container bounds

## Layout Constraints

1. Container Boundaries:

   - All widget content must stay within its defined boundaries
   - Use overflow classes to handle content that exceeds container size
   - Add maxHeight/maxWidth constraints to prevent layout breaking

2. Overflow Handling:

   ```typescript
   // In PopoverWidget.tsx
   <div
     className="bg-white rounded-lg shadow-xl overflow-hidden"
     style={{
       maxHeight: 'calc(100vh - 64px)',
       maxWidth: 'calc(100vw - 64px)',
       overflow: 'auto'
     }}
   >
     <WidgetContent config={config} />
   </div>
   ```

3. Responsive Behavior:
   - Widgets should adapt to available space
   - Use relative units where possible
   - Implement graceful fallbacks for constrained spaces

## Key Patterns to Follow

1. Input Validation:

   - Allow typing any value in inputs
   - Show red border/text for invalid values
   - Validate in preview component only
     Example:

   ```typescript
   // In WidgetPreview/index.tsx
   const offset = Math.min(
     Math.max(
       parseInt(config.appearance?.offset?.replace('px', '') || '16'),
       5
     ),
     32
   );
   ```

2. Widget Positioning:

   - All positioning logic lives in WidgetPreview/index.tsx
   - Widget components receive only what they need to render
   - Keep positioning logic simple and centralized

3. Component Responsibilities:

   - WidgetsSidebar: Form inputs and validation UI
   - WidgetPreview: Layout, positioning, and value constraints
   - Widget Components: Content rendering only

4. State Updates:
   - Use handleConfigUpdate for all config changes
   - Keep edit state in localStorage
   - Clear localStorage after successful load
     Example:
   ```typescript
   // In WidgetsPage.tsx
   const handleSave = async () => {
     const endpoint = editingWidgetId
       ? `http://localhost:3001/widgets/${editingWidgetId}`
       : 'http://localhost:3001/widgets';
     const method = editingWidgetId ? 'PUT' : 'POST';
   };
   ```

## Common Mistakes to Avoid

1. Don't duplicate validation logic across components
2. Don't add positioning logic to widget components
3. Don't overcomplicate simple features
4. Always check for existing patterns before creating new ones
5. Don't create new widgets when editing existing ones
6. Don't store edit state in multiple places
7. Don't skip validation in preview components
8. Don't create new patterns without team discussion
9. Don't skip console.logs for data flow
10. Don't leave edge cases untested

# Architecture Guidelines

## Priority 1: Keep It Simple

- Write only the code that is explicitly requested
- Do not add "just in case" code or features that weren't asked for
- Do not add extra containers, state, or complexity without explicit request
- Do not "improve" working code without being asked
- Do not make assumptions about what might be needed later
- Do not add overlays, wrappers, or additional layers without specific need
- When fixing bugs, do not introduce new features or "improvements"
- Always choose the simplest possible solution first
- If complexity seems needed, ask first
- Keep the original working code until explicitly asked to change it

## Priority 2: Component Structure

...
