declare namespace WorkBench {
    function registerBridge(bridge: Bridge) : void;
    function getTemplate() : string;
    function addAngularComponent() : void;
    
    interface Bridge {
        addComponent(name: string, anchorElement: Element): void;
    }
    
}

declare module "workbench" {
    export = WorkBench;
}