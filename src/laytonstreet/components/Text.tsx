import { TextId, textDefinitions } from 'src/generated/texts';
import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import FileCompatibleLink from './FileCompatibleLink';
import * as Handlebars from 'handlebars';

type TextProps = { 
    source: TextId,
    context: React.Context<any> | any;
};

async function loadText(path: string) {
    let response = await fetch('/texts' + path, {
        headers: { 'Accept': 'text/plain' }
    });
    if (!response.ok) {
        console.error(`Error loading text from path [${path}]`)
        return ""; // TODO handle missing text
    }
    return await response.text();
}

export default function Text({ source: textId, context }: TextProps) {
    const textDef = textDefinitions[textId];

    function resolveContext() {
        if (context && context.Provider && context.Consumer) {
            return React.useContext(context);
        }
        return context;
    }

    let resolvedContext = resolveContext();

    function resolveText(text?: string) {
        if (text && resolvedContext) {
            try {
                const template = Handlebars.compile(text);
                return template(resolvedContext);
            } catch (e) {
                console.error(e); // TODO report
                return "";
            }
        }
        return text;
    }

    function render() {
        if (textDef.text) {
            return (
                <>{resolveText(textDef.text)}</>
            );
        } else {
            const [text, setText] = React.useState<string>();
            React.useEffect(() => {
                loadText(textDef.path!)
                    .then(setText);
            }, []);
            if (text && textDef.path?.endsWith(".md")) {
                return (
                    <ReactMarkdown
                        source={resolveText(text)}
                        renderers={{ link: (props) => <FileCompatibleLink href={props.href} >{props.children}</FileCompatibleLink>}}
                        transformLinkUri={(uri) => {
                            if (uri.startsWith('file:')) {
                                return uri;
                            } else {
                                return ReactMarkdown.uriTransformer(uri);
                            }
                        }} />
                )
            }
            return (
                <>{resolveText(text)}</>
            )
        }
    }

    return render();
}