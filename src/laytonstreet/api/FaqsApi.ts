import Faq from '../entities/Faq';

export async function loadFaqs(): Promise<Faq[]> {
    let response = await fetch("/faqs/index.json", {
        headers: { 'Accept': 'application/json' }
    });
    return response.json();
}

export async function loadAnswer(id: number): Promise<string> {
    let response = await fetch(`/faqs/answers/${id}.md`, {
        headers: { 'Accept': 'text/plain' }
    });
    if (response.ok) {
        return response.text();
    } else {
        return Promise.reject(response);
    }
}
