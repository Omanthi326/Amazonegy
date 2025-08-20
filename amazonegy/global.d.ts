// global.d.ts - Place this in your project root

// Unist types
declare module 'unist' {
  export interface Node {
    type: string;
    position?: Position;
    data?: Data;
  }

  export interface Parent extends Node {
    children: Node[];
  }

  export interface Literal extends Node {
    value: string;
  }

  export interface Position {
    start: Point;
    end: Point;
  }

  export interface Point {
    line: number;
    column: number;
    offset?: number;
  }

  export interface Data {
    [key: string]: unknown;
  }
}

// Hast types (HTML AST)
declare module 'hast' {
  import { Node, Parent, Literal, Position, Data } from 'unist';

  export interface Element extends Parent {
    type: 'element';
    tagName: string;
    properties?: Properties;
    children: Array<Element | Text | Comment>;
  }

  export interface Text extends Literal {
    type: 'text';
  }

  export interface Comment extends Literal {
    type: 'comment';
  }

  export interface Root extends Parent {
    type: 'root';
    children: Array<Element | Comment | Text | Doctype>;
  }

  export interface Doctype extends Node {
    type: 'doctype';
    name: string;
    public?: string;
    system?: string;
  }

  export interface Properties {
    [key: string]: boolean | number | string | null | undefined | Array<string | number>;
  }

  export { Node, Parent, Literal, Position, Data };
}

// Mdast types (Markdown AST)
declare module 'mdast' {
  import { Node, Parent, Literal, Position, Data } from 'unist';

  export interface Root extends Parent {
    type: 'root';
    children: Array<BlockContent>;
  }

  export interface Paragraph extends Parent {
    type: 'paragraph';
    children: Array<PhrasingContent>;
  }

  export interface Heading extends Parent {
    type: 'heading';
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    children: Array<PhrasingContent>;
  }

  export interface ThematicBreak extends Node {
    type: 'thematicBreak';
  }

  export interface Blockquote extends Parent {
    type: 'blockquote';
    children: Array<BlockContent>;
  }

  export interface List extends Parent {
    type: 'list';
    ordered?: boolean;
    start?: number;
    spread?: boolean;
    children: Array<ListItem>;
  }

  export interface ListItem extends Parent {
    type: 'listItem';
    checked?: boolean;
    spread?: boolean;
    children: Array<BlockContent>;
  }

  export interface Code extends Literal {
    type: 'code';
    lang?: string;
    meta?: string;
  }

  export interface InlineCode extends Literal {
    type: 'inlineCode';
  }

  export interface Text extends Literal {
    type: 'text';
  }

  export interface Emphasis extends Parent {
    type: 'emphasis';
    children: Array<PhrasingContent>;
  }

  export interface Strong extends Parent {
    type: 'strong';
    children: Array<PhrasingContent>;
  }

  export interface Link extends Parent {
    type: 'link';
    url: string;
    title?: string;
    children: Array<PhrasingContent>;
  }

  export interface Image extends Node {
    type: 'image';
    url: string;
    title?: string;
    alt?: string;
  }

  export interface Break extends Node {
    type: 'break';
  }

  export type BlockContent = 
    | Paragraph 
    | Heading 
    | ThematicBreak 
    | Blockquote 
    | List 
    | Code;

  export type PhrasingContent = 
    | Text 
    | Emphasis 
    | Strong 
    | InlineCode 
    | Break 
    | Link 
    | Image;

  export { Node, Parent, Literal, Position, Data };
}

// Additional declarations for any other missing types
declare module '@types/unist' {
  export * from 'unist';
}

declare module '@types/hast' {
  export * from 'hast';
}

declare module '@types/mdast' {
  export * from 'mdast';
}

// Catch-all for any remark/rehype related modules
declare module 'remark-*' {
  const plugin: any;
  export default plugin;
}

declare module 'rehype-*' {
  const plugin: any;
  export default plugin;
}

declare module 'unified-*' {
  const plugin: any;
  export default plugin;
}