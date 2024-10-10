import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable({
    providedIn: 'root',
})
export class RestService {
    private authorizationHeader = { Authorization: '' };

    constructor(private readonly router: Router) {}

    /**
     * Set a default authorization header to be sent on every request
     * @param token The token for authorization
     */
    public setAuthorizationToken(token: string) {
        if (!token) throw new Error('Token not found');
        this.authorizationHeader.Authorization = `Bearer ${token}`;
    }

    /**
     * Get method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async get<T>(url: string, options: RequestInit = {}): Promise<T> {
        return await this.request<T>(url, options, 'GET');
    }

    /**
     * Post method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async post<T>(url: string, options: RequestInit = {}): Promise<T> {
        return await this.request<T>(url, options, 'POST');
    }

    /**
     * Put method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async put<T>(url: string, options: RequestInit = {}): Promise<T> {
        return await this.request<T>(url, options, 'PUT');
    }

    /**
     * Patch method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async patch<T>(url: string, options: RequestInit = {}): Promise<T> {
        return await this.request<T>(url, options, 'PATCH');
    }

    /**
     * Delete method
     * @param url Url to send the API to
     * @param options Options for the api request
     * @returns Data if found
     */
    public async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
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
        options: RequestInit,
        method: HttpMethods
    ): Promise<T> {
        this.setupRequestHeaders(options);
        options.method = method;
        return (await this.fetchRequest(url, options)) as T;
    }

    /**
     * Handling the wrapper for the Fetch API
     * @param url Url to send the API to
     * @param requestOptions Options for the api request
     * @returns JSON data or Text data
     */
    private async fetchRequest(url: string, requestOptions: RequestInit) {
        const response = await fetch(url, { ...requestOptions });
        if (![200, 201, 202].includes(response.status)) {
            if (response.status === 401) {
                // Navigate to home if authentication is not possible
                this.authorizationHeader = { Authorization: '' };
                return this.router.navigate(['']);
            }
            throw new HttpErrorResponse({ status: response.status });
        }

        if (response.headers.get('Content-Type')?.includes('application/json'))
            return await response.json();
        return await response.text();
    }

    /**
     * Sets up headers
     * @param requestOptions Options for the api request
     */
    private setupRequestHeaders(requestOptions: RequestInit) {
        requestOptions.headers = {
            ...requestOptions.headers,
            ...this.authorizationHeader,
        };
    }
}
