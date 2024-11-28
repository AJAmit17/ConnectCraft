export interface PinataFile {
    id: string;
    cid: string;
    name: string;
    size: number;
    type: string;
    created: string;
    metadata: Record<string, any>;
    pinStatus: {
        status: 'pinned' | 'unpinned' | 'failed';
        timestamp: string;
    };
}

export interface PaginatedResponse<T> {
    data: T[];
    count: number;
    pageSize: number;
    page: number;
    totalPages: number;
}

export interface FileListParams {
    page?: number;
    pageSize?: number;
    type?: string;
    sortBy?: 'created' | 'name' | 'size';
    sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}