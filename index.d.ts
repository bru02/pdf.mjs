// Definitions by: Josh Baldwin <https://github.com/jbaldwin>, Dmitrii Sorin <https://github.com/1999>

interface PDFPromise<T> {
    isResolved(): boolean;
    isRejected(): boolean;
    resolve(value: T): void;
    reject(reason: string): void;
    then<U>(onResolve: (promise: T) => U, onReject?: (reason: string) => void): PDFPromise<U>;
}

interface PDFTreeNode {
    title: string;
    bold: boolean;
    italic: boolean;
    color: number[]; // [r,g,b]
    dest: any;
    items: PDFTreeNode[];
}

interface PDFInfo {
    PDFFormatVersion: string;
    IsAcroFormPresent: boolean;
    IsXFAPresent: boolean;
    [key: string]: any;	// return type is string, typescript chokes
}

interface PDFMetadata {
    parse(): void;
    get(name: string): string;
    has(name: string): boolean;
}

interface PDFSource {
    /** The URL of the PDF. */
    url?: string;
    /**
     * Binary PDF data. Use typed arrays
     * (Uint8Array) to improve the memory usage. If PDF data is BASE64-encoded,
     * use atob() to convert it to a binary string first.
     */
    data?: Uint8Array | BufferSource | string;
    /**
     * Basic authentication headers.
     */
    httpHeaders?: {
        [key: string]: string;
    };
    /**
     * For decrypting password-protected PDFs.
     */
    password?: string;
    /**
   * The URL where the predefined
   * Adobe CMaps are located. Include trailing slash. */
    cMapUrl?: string;
    /**
     * Specifies if the Adobe CMaps are
     * binary packed. */
    cMapPacked?: boolean;
    /**
     * The factory that will be
     * used when reading built-in CMap files. Providing a custom factory is useful
     * for environments without `XMLHttpRequest` support, such as e.g. Node.js.
     * The default value is {DOMCMapReaderFactory}.
     */
    CMapReaderFactory?: any;
}

interface PDFProgressData {
    loaded: number;
    total: number;
}


declare class PDFDataRangeTransport {
    constructor(length: number, initialData: Uint8Array | BufferSource, progressiveDone?: boolean);
    addRangeListener(listener: PDFDataRangeTransportListener): void;
    addProgressListener(listener: PDFDataRangeTransportListener): void;
    addProgressiveReadListener(listener: PDFDataRangeTransportListener): void;
    addProgressiveDoneListener(listener: PDFDataRangeTransportListener): void;
    onDataRange(begin: number, chunk: unknown): void;
    onDataProgress(loaded: number, total: number): void;
    onDataProgressiveRead(chunk: unknown): void;
    onDataProgressiveDone(): void;
    transportReady(): void;
    requestDataRange(begin: number, end: number): void;
    abort(): void;
}

interface PDFWorkerParameters {
    name?: string;
    port?: any;
    verbosity?: VerbosityLevel;
}

declare class PDFWorker {
    constructor(params?: PDFWorkerParameters);
    readonly promise: Promise<unknown>;
    readonly port: any | null;
    readonly messageHandler: unknown | null;
    destroy(): void;
    static fromPort(params?: PDFWorkerParameters): PDFWorker;
    static getWorkerSrc(): string;
}
declare enum CMapCompressionType {
    NONE = 0,
    BINARY = 1,
    STREAM = 2,
}
interface CMapReaderFactory {
    new(params: { baseUrl: string; isCompressed: boolean }): CMapReader;
}
interface CMapReader {
    fetch(params: {
        name: string;
    }): Promise<{
        cMapData: any;
        compressionType: CMapCompressionType;
    }>;
}

interface PDFDocumentProxy {

    /**
     * Total number of pages the PDF contains.
     **/
    numPages: number;

    /**
     * A unique ID to identify a PDF.  Not guaranteed to be unique.  [jbaldwin: haha what]
     **/
    fingerprint: string;

    /**
     * True if embedded document fonts are in use.  Will be set during rendering of the pages.
     **/
    embeddedFontsUsed(): boolean;

    /**
     * @param number The page number to get.  The first page is 1.
     * @return A promise that is resolved with a PDFPageProxy.
     **/
    getPage(number: number): PDFPromise<PDFPageProxy>;

    /**
     * TODO: return type of Promise<???>
     *  A promise that is resolved with a lookup table for mapping named destinations to reference numbers.
     **/
    getDestinations(): PDFPromise<any[]>;

    /**
     *  A promise that is resolved with an array of all the JavaScript strings in the name tree.
     **/
    getJavaScript(): PDFPromise<string[]>;

    /**
     *  A promise that is resolved with an array that is a tree outline (if it has one) of the PDF.  @see PDFTreeNode
     **/
    getOutline(): PDFPromise<PDFTreeNode[]>;

    /**
     * A promise that is resolved with the info and metadata of the PDF.
     **/
    getMetadata(): PDFPromise<{ info: PDFInfo; metadata: PDFMetadata }>;

    /**
     * Is the PDF encrypted?
     **/
    isEncrypted(): PDFPromise<boolean>;

    /**
     * A promise that is resolved with Uint8Array that has the raw PDF data.
     **/
    getData(): PDFPromise<Uint8Array>;

    /**
     * TODO: return type of Promise<???>
     * A promise that is resolved when the document's data is loaded.
     **/
    dataLoaded(): PDFPromise<any[]>;

    /**
     *
     **/
    destroy(): void;
}

interface PDFRef {
    num: number;
    gen: any; // todo
}

interface PDFPageViewportOptions {
    viewBox: any;
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
    dontFlip: boolean;
}

interface PDFPageViewport {
    width: number;
    height: number;
    fontScale: number;
    transforms: number[];

    clone(options: PDFPageViewportOptions): PDFPageViewport;
    convertToViewportPoint(x: number, y: number): number[]; // [x, y]
    convertToViewportRectangle(rect: number[]): number[]; // [x1, y1, x2, y2]
    convertToPdfPoint(x: number, y: number): number[]; // [x, y]
}

interface PDFAnnotationData {
    subtype: string;
    rect: number[]; // [x1, y1, x2, y2]
    annotationFlags: any; // todo
    color: number[]; // [r,g,b]
    borderWidth: number;
    hasAppearance: boolean;
}

interface PDFAnnotations {
    getData(): PDFAnnotationData;
    hasHtml(): boolean; // always false
    getHtmlElement(commonOjbs: any): HTMLElement; // throw new NotImplementedException()
    getEmptyContainer(tagName: string, rect: number[]): HTMLElement; // deprecated
    isViewable(): boolean;
    loadResources(keys: any): PDFPromise<any>;
    getOperatorList(evaluator: any): PDFPromise<any>;
    // ... todo
}

interface PDFRenderTextLayer {
    beginLayout(): void;
    endLayout(): void;
    appendText(): void;
}

interface PDFRenderImageLayer {
    beginLayout(): void;
    endLayout(): void;
    appendImage(): void;
}

interface PDFRenderParams {
    canvasContext: CanvasRenderingContext2D;
    viewport?: PDFPageViewport;
    textLayer?: PDFRenderTextLayer;
    imageLayer?: PDFRenderImageLayer;
    continueCallback?: (_continue: () => void) => void;
}

/**
 * RenderTask is basically a promise but adds a cancel function to termiate it.
 **/
interface PDFRenderTask extends PDFLoadingTask<PDFPageProxy> {

    /**
     * Cancel the rendering task.  If the task is currently rendering it will not be cancelled until graphics pauses with a timeout.  The promise that this object extends will resolve when cancelled.
     **/
    cancel(): void;
}

interface PDFPageProxy {

    /**
     * Page number of the page.  First page is 1.
     **/
    pageNumber: number;

    /**
     * The number of degrees the page is rotated clockwise.
     **/
    rotate: number;

    /**
     * The reference that points to this page.
     **/
    ref: PDFRef;

    /**
     * @return An array of the visible portion of the PDF page in the user space units - [x1, y1, x2, y2].
     **/
    view: number[];

    /**
     * @param scale The desired scale of the viewport.
     * @param rotate Degrees to rotate the viewport.  If omitted this defaults to the page rotation.
     * @param dontFlip
     * @return
     **/
    getViewport(scale: number, rotate?: number, dontFlip?: boolean): PDFPageViewport;

    /**
     * A promise that is resolved with an array of the annotation objects.
     **/
    getAnnotations(): PDFPromise<PDFAnnotations>;

    /**
     * Begins the process of rendering a page to the desired context.
     * @param params Rendering options.
     * @return An extended promise that is resolved when the page finishes rendering.
     **/
    render(params: PDFRenderParams): PDFRenderTask;

    /**
     * A promise that is resolved with the string that is the text content frm the page.
     **/
    getTextContent(): PDFPromise<TextContent>;

    /**
     * marked as future feature
     **/
    //getOperationList(): PDFPromise<>;

    /**
     * Destroyes resources allocated by the page.
     **/
    destroy(): void;
}

interface TextContentItem {
    str: string;
    transform: number[]; // [0..5]   4=x, 5=y
    width: number;
    height: number;
    dir: string; // Left-to-right (ltr), etc
    fontName: string; // A lookup into the styles map of the owning TextContent
}

interface TextContent {
    items: TextContentItem[];
    styles: any;
}

interface PDFLoadingTask<T> {
    promise: PDFPromise<T>;
}

/**
 * This is the main entry point for loading a PDF and interacting with it.
 * NOTE: If a URL is used to fetch the PDF data a standard XMLHttpRequest(XHR)
 * is used, which means it must follow the same origin rules that any XHR does
 * e.g. No cross domain requests without CORS.
 * @param source
 * @param pdfDataRangeTransport Used if you want to manually server range requests for data in the PDF.  @see viewer.js for an example of pdfDataRangeTransport's interface.
 * @param passwordCallback Used to request a password if wrong or no password was provided.  The callback receives two parameters: function that needs to be called with new password and the reason.
 * @param progressCallback Progress callback.
 * @return A promise that is resolved with PDFDocumentProxy object.
 **/
declare function getDocument(
    source: string,
    pdfDataRangeTransport?: any,
    passwordCallback?: (fn: (password: string) => void, reason: string) => string,
    progressCallback?: (progressData: PDFProgressData) => void
): PDFLoadingTask<PDFDocumentProxy>;

declare function getDocument(
    source: Uint8Array,
    pdfDataRangeTransport?: any,
    passwordCallback?: (fn: (password: string) => void, reason: string) => string,
    progressCallback?: (progressData: PDFProgressData) => void
): PDFLoadingTask<PDFDocumentProxy>;

declare function getDocument(
    source: PDFSource,
    pdfDataRangeTransport?: any,
    passwordCallback?: (fn: (password: string) => void, reason: string) => string,
    progressCallback?: (progressData: PDFProgressData) => void
): PDFLoadingTask<PDFDocumentProxy>;
