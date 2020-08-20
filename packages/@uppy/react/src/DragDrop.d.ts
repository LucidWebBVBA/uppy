import { ToUppyProps } from './CommonTypes'
import DragDrop = require('@lucidweb/uppy-drag-drop')

export type DragDropProps = ToUppyProps<DragDrop.DragDropOptions>

/**
 * React component that renders an area in which files can be dropped to be
 * uploaded.
 */
declare const DragDropComponent: React.ComponentType<DragDropProps>;
export default DragDropComponent;
