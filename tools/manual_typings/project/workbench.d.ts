declare namespace jw {

    class PageController {
        id: string;
        workbench: any;
        appController: any;
        urlInfo: any;
        sessionToken: string;
        userId: string;

        pageDescriptor: any;
        name: string;
        pageWidgetDescriptors: any;
        layoutDescriptor: any;
        appLayoutFactory: any;
        keyboardShortcutFunctions: any;
        
        /**
         * @public
         * Publishes the events
         *
         * @param eventId A required param which is the id of the even.t<br/>
         * @param publisherId A required param which is the component id of the publisher that
         * is assigned by worbkench, such as the widget id.<br/>
         * @params publisherData: An optional param that is a json object containing the
         * publishers data that will be passed to the listeners of the event.
         */
        publish(eventId: string, publisherId: string, publisherData: any): void;
        
        /**
         * @public
         * Does the subscription.
         *
         * @param eventId the id of the event. It supports subscribing for messages
         * in a hierarchy. If the subsription is for an event "a.b" and an event
         * for "a.b.c" is fired, the subscription's callback method will be called since
         * it is with in the hierachy of event "a.b.c"
         * @param subscriberId the id of the component, such as a widget, or a
         * pageController etc, that is subscribing for the event.
         * @param callback the function that will be called when the subscriptions
         * event is fired.  The callback function will receive a params object, that
         * will have the eventId, and the publisherData which will be a name
         * value pair.
         */
        subscribe(eventId: string, subscriberId: string, callback: (data: EventData) => any): void;

        /**
         * The live widgets in this page.  Entries in this array have the following fields:
         * <li>name - the name of the widget as assigned in workbench-config.xml</li>
         * <li>widget - the actual widget instance, only if the widget is not indexed</li>
         * <li>instances - the array of widget instances, if the widget is indexed</li>
         */
        widgets: Array<any>;
    }

    class Panel {
        workbench: any;
        document: any;
        id: string;
        divContainer: Node;
    }

    class Widget extends jw.Panel {
        constructor(params: any);
        
        render(divContainer: Node): void;
        
        name: string;
        indet: number;
        sessionToken: string;
        userId: string;
        pageController: jw.PageController;
        widgetComponentContainer: any; // Only used by angular widgets.
    }
    
    interface EventData {
        eventId: string;
        publisherData: any;
    }

}

declare module "jw" {
    export = jw;
}