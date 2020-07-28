import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { Spinner } from 'reactstrap';
import { loadAnswer, loadFaqs } from '../api/FaqsApi';
import FileCompatibleLink from '../components/FileCompatibleLink';
import Page from '../components/Page';
import Faq from '../entities/Faq';

export default function FaqsPage() {
    const [faqs, setFaqs] = React.useState<Faq[]>();
    React.useEffect(() => {
        loadFaqs().then(setFaqs);
    }, []);

    return (
        <Page narrow>
            <h1 className="text-center display-4">FAQs</h1>
            <br/>
            <div>
                {displayFaqs(faqs)}
            </div>
        </Page>
    );
}

function displayFaqs(faqs?: Faq[]) {
    return faqs
        ? faqs.map(faq => <CollapsableFaq faq={faq} key={faq.id} />)
        : <Spinner size="sm" color="secondary" className="text-center" />;
}

function CollapsableFaq({faq}: {faq: Faq}) {
    const [answer, setAnswer] = React.useState<string>();
    React.useEffect(() => {
        loadAnswer(faq.id)
            .then(setAnswer)
            .catch(() => setAnswer('...'));
    }, [faq.id]);
    return (
        <div>
            <h3>{faq.question}</h3>
            <ReactMarkdown
                source={answer}
                renderers={{ link: (props) => <FileCompatibleLink href={props.href} >{props.children}</FileCompatibleLink>}}
                transformLinkUri={(uri) => {
                    if (uri.startsWith('file:')) {
                        return uri;
                    } else {
                        return ReactMarkdown.uriTransformer(uri);
                    }
                }} />
        </div>
    );
}
