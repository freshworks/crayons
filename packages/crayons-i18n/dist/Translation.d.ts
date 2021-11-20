interface i18nConfig {
    [key: string]: {
        [key: string]: string;
    };
}
export declare class TranslationController {
    state: any;
    onChange: any;
    requests: Map<string, Promise<any>>;
    constructor();
    fetchTranslations(forceUpdate?: boolean, lang?: string): Promise<any>;
    setLang(lang: string): void;
    fetchDefaultTranslations(locale: string): Promise<any>;
    setTranslations(json: i18nConfig): void;
    /** Decorator to handle i18n support */
    i18n({ defaultValue }?: {
        defaultValue?: string;
    }): any;
}
export {};
