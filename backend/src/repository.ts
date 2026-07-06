import fs from 'node:fs';
import path from 'node:path';

export class Repository<T> {
    private items: T[];
    private readonly dataFilePath: string;

    constructor(dataFilePath: string) {
        this.dataFilePath = dataFilePath;
        this.items = this.loadItems();
    }

    private loadItems(): T[] {
        if (!fs.existsSync(this.dataFilePath)) {
            return [];
        }

        const content = fs.readFileSync(this.dataFilePath, 'utf8');
        if (!content.trim()) {
            return [];
        }

        return JSON.parse(content) as T[];
    }

    private saveItems(): void {
        const directory = path.dirname(this.dataFilePath);
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(this.dataFilePath, JSON.stringify(this.items, null, 2));
    }

    add(item: T): void {
        this.items.push(item);
        this.saveItems();
    }

    getAll(): T[] {
        return this.items;
    }

    findById(id: string, getId: (item: T) => string): T | undefined {
        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i];
            const currentItemId = getId(currentItem);

            if (currentItemId === id) {
                return currentItem;
            }
        }
        return undefined;
    }

    updateById(id: string, getId: (item: T) => string, updatedItem: T): boolean {
        for (let i = 0; i < this.items.length; i++) {
            const currentItemId = getId(this.items[i]);

            if (currentItemId === id) {
                this.items[i] = updatedItem;
                this.saveItems();
                return true;
            }
        }
        return false;
    }

    deleteById(id: string, getId: (item: T) => string): boolean {
        for (let i = 0; i < this.items.length; i++) {
            const currentItemId = getId(this.items[i]);

            if (currentItemId === id) {
                this.items.splice(i, 1);
                this.saveItems();
                return true;
            }
        }
        return false;
    }
}

