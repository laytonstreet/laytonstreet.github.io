import * as React from 'react';
import { loadFaqs } from '../api/FaqsApi';
import Page from '../components/Page';
import Faq from '../entities/Faq';
import { intersperse } from '../utils/LsUtils';
import { Spinner } from 'reactstrap';

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
    const answerLines = faq.answer.split("\n");
    const answerWithLineBreaks = intersperse<any>(answerLines, <br />);
    return (
        <div>
            <h3>{faq.question}</h3>
            <p>{[...answerWithLineBreaks]}</p>
        </div>
    );
}
