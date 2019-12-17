import Faq from '../entities/Faq';

export async function loadFaqs(): Promise<Faq[]> {
    const options = {
        headers: { 'Accept': 'application/json' }
    };
    return await fetch("/faqs/index.json", options)
        .then(response => response.json());
}