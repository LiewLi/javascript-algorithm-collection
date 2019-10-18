interface IStorage {
  getValue(index: number): boolean;
  setValue(index: number): void;
}

export class BloomFilter {
  storage: IStorage = this.createStorage(this.size);
  constructor(private size: number = 100) {}

  private createStorage(size: number): IStorage {
    const storage: boolean[] = new Array(size).fill(false);

    return {
      getValue(index) {
        return storage[index];
      },
      setValue(index) {
        storage[index] = true;
      }
    };
  }

  insert(item: string) {
    const hashValues = this.getHashValues(item);
    hashValues.forEach(h => this.storage.setValue(h));
  }

  mayContains(item: string) {
    const hashValues = this.getHashValues(item);
    for (const h of hashValues) {
      if (!this.storage.getValue(h)) {
        return false;
      }
    }

    return true;
  }

  private _hash1(item: string): number {
    let hash = 0;
    for (let idx = 0; idx < item.length; ++idx) {
      const ch = item.charCodeAt(idx);
      hash = (hash << 5) + hash + ch;
      hash &= hash;
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  private _hash2(item: string): number {
    let hash = 5381;
    for (let idx = 0; idx < item.length; ++idx) {
      const ch = item.charCodeAt(idx);
      hash = (hash << 5) + hash + ch;
    }

    return Math.abs(hash % this.size);
  }

  private _hash3(item: string): number {
    let hash = 0;
    for (let idx = 0; idx < item.length; ++idx) {
      const ch = item.charCodeAt(idx);
      hash = (hash << 5) - hash;
      hash += ch;
      hash &= hash;
    }

    return Math.abs(hash % this.size);
  }

  private getHashValues(item: string): number[] {
    return [this._hash1(item), this._hash2(item), this._hash3(item)];
  }
}

const bf = new BloomFilter();
bf.insert("hello");
bf.insert("world");
console.log(bf.mayContains("ts"));
