import * as React from 'react';
import { Link } from 'react-router-dom';

export default function CantFindWhatYoureLookingForToast() {
    const [isDismissed, setDismissed] = React.useState(false);
    const dismiss = () => setDismissed(true);

    if (isDismissed) {
        return null;
    }

    const style: React.CSSProperties = {
        opacity: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: "1rem"
    };

    return (
        <div className="toast" style={style}>
            <div className="toast-header">
                Can't find what you're looking for?
                <button type="button" className="ml-auto mb-1 close" onClick={dismiss} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                We'd like our webite to be as easy to navigate as possible,
                but if you can't find what your looking for take a look at
                our <Link to="faqs">FAQs</Link> or <Link to="contact-us">contact us</Link>.            </div>
        </div>
    );
}
