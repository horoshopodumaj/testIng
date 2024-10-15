class BlockManager {
    constructor(container) {
        this.container = container;
        this.blocks = [];
        this.deletedBlocks = [];
        this.maxBlocks = 5;
        this.blockHeight = 100;
        this.blockCount = 0;
    }

    addBlock() {
        const block = this.createBlock();
        this.container.appendChild(block);
        this.blocks.push(block);

        if (this.blocks.length > this.maxBlocks) {
            this.deleteTopBlock();
        }
    }

    deleteBlock() {
        if (this.blocks.length === 0) return;

        const lastBlock = this.blocks.pop();
        this.container.removeChild(lastBlock);

        if (this.deletedBlocks.length > 0 && this.blocks.length < this.maxBlocks) {
            this.returnTopBlock();
        }
    }

    createBlock() {
        const block = document.createElement('div');
        block.classList.add('block');
        block.textContent = `Блок ${++this.blockCount}`;
        return block;
    }

    deleteTopBlock() {
        const topBlock = this.blocks.shift();
        this.deletedBlocks.push(topBlock);
        this.container.removeChild(topBlock);
    }

    returnTopBlock() {
        const blockToRestore = this.deletedBlocks.pop();
        this.blocks.unshift(blockToRestore);
        this.container.insertBefore(blockToRestore, this.container.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const manager = new BlockManager(container);

    document.getElementById('addBtn').addEventListener('click', () => {
        manager.addBlock();
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
        manager.deleteBlock();
    });
});