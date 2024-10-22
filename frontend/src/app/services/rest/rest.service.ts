import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestWrapper {
    body?: object;
    headers?: Record<string, string>;
}

@Injectable({
    providedIn: 'root',
})
export class RestService {
    constructor(private readonly router: Router) {}

    /**
     * Get method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async get<T>(url: string, options: RequestWrapper = {}): Promise<T> {
        return await this.request<T>(url, options, 'GET');
    }

    /**
     * Post method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async post<T>(
        url: string,
        options: RequestWrapper = {}
    ): Promise<T> {
        return await this.request<T>(url, options, 'POST');
    }

    /**
     * Put method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async put<T>(url: string, options: RequestWrapper = {}): Promise<T> {
        return await this.request<T>(url, options, 'PUT');
    }

    /**
     * Patch method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async patch<T>(
        url: string,
        options: RequestWrapper = {}
    ): Promise<T> {
        return await this.request<T>(url, options, 'PATCH');
    }

    /**
     * Delete method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async delete<T>(
        url: string,
        options: RequestWrapper = {}
    ): Promise<T> {
        return await this.request<T>(url, options, 'DELETE');
    }

    /**
     * Main request handler
     * @param url Url to send the API to
     * @param options Options for the api request
     * @param method Data if found
     * @returns
     */
    private async request<T>(
        url: string,
        options: RequestWrapper,
        method: HttpMethods
    ): Promise<T> {
        const requestOptions = {} as RequestInit;
        const headers = options.headers || {};
        if (method !== 'GET' && method !== 'DELETE') {
            if (!headers['Content-Type'])
                headers['Content-Type'] = 'application/json';
        }
        requestOptions.headers = { ...headers };
        requestOptions.method = method;

        requestOptions.credentials = 'include';
        if (options.body) requestOptions.body = JSON.stringify(options.body);
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    /**
     * Handling the wrapper for the Fetch API
     * @param url Url to send the API to
     * @param requestOptions Options for the api request
     * @returns JSON data or Text data
     */
    private async fetchRequest(url: string, requestOptions: RequestInit) {
        const response = await fetch(url, { ...requestOptions });
        if (![200, 201, 202, 204].includes(response.status)) {
            if (
                response.status === 401 &&
                !window.location.href.includes('authentication') // ensure the redirect is done if the route is not 'authentication'
            ) {
                // Navigate to home if authentication is not possible
                return this.router.navigate(['']);
            }
            throw new HttpErrorResponse({
                error: await response.json(),
                status: response.status,
                statusText: response.statusText,
            });
        }

        if (response.headers.get('Content-Type')?.includes('application/json'))
            return await response.json();
        return await response.text();
    }
}
