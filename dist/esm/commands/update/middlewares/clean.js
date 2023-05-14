import * as fs from 'fs';
export default ({ tmp }) => {
    if (fs.existsSync(tmp.root)) {
        fs.rmSync(tmp.root, { recursive: true, force: true });
    }
};
