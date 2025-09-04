import config from "../config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class AppwriteService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("AppwriteService :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("AppwriteService :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
            return true; // Return true on successful deletion
        } catch (error) {
            console.error("AppwriteService :: deletePost :: error", error);
            throw error; // Throw error to be handled by the caller
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("AppwriteService :: getPost :: error", error);
            throw error; // Consistently throw error on failure
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("AppwriteService :: getPosts :: error", error);
            throw error; // Consistently throw error on failure
        }
    }

    // file upload service........
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("AppwriteService :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appWriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("AppwriteService :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
        } catch (error) {
            console.error("AppwriteService :: getFilePreview :: error", error);
            throw error;
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;