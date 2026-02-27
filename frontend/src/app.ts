// Type definitions
interface ValidationResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

interface SortResponse {
    word?: string[];
    error?: string;
}

// DOM Elements
const validationForm = document.getElementById('validationForm') as HTMLFormElement;
const directTestForm = document.getElementById('directTestForm') as HTMLFormElement;
const responseSection = document.getElementById('responseSection') as HTMLDivElement;
const responseHeader = document.getElementById('responseHeader') as HTMLDivElement;
const responseIcon = document.getElementById('responseIcon') as HTMLSpanElement;
const responseTitle = document.getElementById('responseTitle') as HTMLSpanElement;
const responseStatus = document.getElementById('responseStatus') as HTMLSpanElement;
const responseContent = document.getElementById('responseContent') as HTMLPreElement;
const copyResponseBtn = document.getElementById('copyResponse') as HTMLButtonElement;

// Show response in the UI
function showResponse(data: unknown, isSuccess: boolean, status: string | number): void {
    responseSection.classList.remove('hidden');
    
    const formattedData = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    
    if (isSuccess) {
        responseHeader.className = 'px-4 py-3 border-b border-emerald-500/20 bg-emerald-500/10 flex items-center gap-2';
        responseIcon.className = 'iconify text-emerald-500';
        responseIcon.setAttribute('data-icon', 'lucide:check-circle');
        responseTitle.className = 'text-sm font-medium text-emerald-400';
        responseTitle.textContent = 'Success';
        responseStatus.className = 'ml-auto text-xs font-mono text-emerald-500/70';
        responseContent.className = 'p-4 text-sm font-mono overflow-x-auto text-zinc-300';
    } else {
        responseHeader.className = 'px-4 py-3 border-b border-red-500/20 bg-red-500/10 flex items-center gap-2';
        responseIcon.className = 'iconify text-red-500';
        responseIcon.setAttribute('data-icon', 'lucide:x-circle');
        responseTitle.className = 'text-sm font-medium text-red-400';
        responseTitle.textContent = 'Error';
        responseStatus.className = 'ml-auto text-xs font-mono text-red-500/70';
        responseContent.className = 'p-4 text-sm font-mono overflow-x-auto text-red-300';
    }
    
    responseStatus.textContent = `Status: ${status}`;
    responseContent.textContent = formattedData;
    
    // Scroll to response
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Set button loading state
function setButtonLoading(button: HTMLButtonElement, textSpan: HTMLElement, isLoading: boolean, loadingText: string, defaultText: string): void {
    if (isLoading) {
        textSpan.textContent = loadingText;
        button.disabled = true;
        button.classList.add('opacity-70');
    } else {
        textSpan.textContent = defaultText;
        button.disabled = false;
        button.classList.remove('opacity-70');
    }
}

// Validation Form Handler
validationForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const apiUrl = (document.getElementById('apiUrl') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const submitBtn = document.getElementById('validateBtn') as HTMLButtonElement;
    const btnText = document.getElementById('validateBtnText') as HTMLSpanElement;
    
    setButtonLoading(submitBtn, btnText, true, 'Validating...', 'Validate Endpoint');
    
    try {
        const validationUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(apiUrl)}&email=${encodeURIComponent(email)}`;
        
        const response = await fetch(validationUrl);
        const data = await response.text();
        
        let parsedData: unknown;
        try {
            parsedData = JSON.parse(data);
        } catch {
            parsedData = data;
        }
        
        showResponse(parsedData, response.ok, response.status);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        showResponse({ error: errorMessage }, false, 'Network Error');
    } finally {
        setButtonLoading(submitBtn, btnText, false, 'Validating...', 'Validate Endpoint');
    }
});

// Direct Test Form Handler
directTestForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const apiUrl = (document.getElementById('directApiUrl') as HTMLInputElement).value;
    const testString = (document.getElementById('testString') as HTMLInputElement).value;
    const submitBtn = document.getElementById('directTestBtn') as HTMLButtonElement;
    const btnText = document.getElementById('directTestBtnText') as HTMLSpanElement;
    
    setButtonLoading(submitBtn, btnText, true, 'Testing...', 'Test Endpoint');
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: testString })
        });
        
        const data: SortResponse = await response.json();
        showResponse(data, response.ok, response.status);
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        showResponse({ error: errorMessage }, false, 'Network Error');
    } finally {
        setButtonLoading(submitBtn, btnText, false, 'Testing...', 'Test Endpoint');
    }
});

// Copy Response Handler
copyResponseBtn.addEventListener('click', async () => {
    const content = responseContent.textContent || '';
    
    try {
        await navigator.clipboard.writeText(content);
        copyResponseBtn.innerHTML = '<span class="iconify" data-icon="lucide:check" data-width="12"></span> Copied!';
        setTimeout(() => {
            copyResponseBtn.innerHTML = '<span class="iconify" data-icon="lucide:copy" data-width="12"></span> Copy';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
});

// Log that the app is loaded
console.log('API Endpoint Tester loaded successfully!');