import { Params } from './type';
export default class Watermark {
    params: Params;
    styleStr: string;
    containerObserver: MutationObserver;
    observer: MutationObserver;
    watermarkDiv: HTMLElement;
    flag: boolean;
    constructor(params: Params);
    toDataURL(): string;
    createWatermarkDom(): void;
    output(): void;
    destroy(): void;
}
