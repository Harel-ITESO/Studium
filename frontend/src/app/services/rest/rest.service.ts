import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RestService {
    private authorizationHeader = { Authorization: '' };

    public setAuthorizationToken(token: string) {
        if (!token) throw new Error('Token not found');
        this.authorizationHeader.Authorization = `Bearer ${token}`;
    }

    public async get<T>(
        url: string,
        requestOptions: RequestInit = {}
    ): Promise<T> {
        this.setupRequestHeaders(requestOptions);
        requestOptions.method = 'GET';
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    public async post<T>(
        url: string,
        requestOptions: RequestInit = {}
    ): Promise<T> {
        this.setupRequestHeaders(requestOptions);
        requestOptions.method = 'POST';
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    public async put<T>(
        url: string,
        requestOptions: RequestInit = {}
    ): Promise<T> {
        this.setupRequestHeaders(requestOptions);
        requestOptions.method = 'PUT';
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    public async patch<T>(
        url: string,
        requestOptions: RequestInit = {}
    ): Promise<T> {
        this.setupRequestHeaders(requestOptions);
        requestOptions.method = 'PATCH';
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    public async delete<T>(
        url: string,
        requestOptions: RequestInit = {}
    ): Promise<T> {
        this.setupRequestHeaders(requestOptions);
        requestOptions.method = 'DELETE';
        return (await this.fetchRequest(url, requestOptions)) as T;
    }

    private async fetchRequest(url: string, requestOptions: RequestInit) {
        const response = await fetch(url, { ...requestOptions });
        if (response.headers.get('Content-Type')?.includes('application/json'))
            return await response.json();
        return await response.text();
    }

    private setupRequestHeaders(requestOptions: RequestInit) {
        requestOptions.headers = {
            ...requestOptions.headers,
            ...this.authorizationHeader,
        };
    }
}
