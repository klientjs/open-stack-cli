import * as fs from 'fs';

import type { Context } from '../context';

export default ({ tmp }: Context) => {
  if (fs.existsSync(tmp.root)) {
    fs.rmSync(tmp.root, { recursive: true, force: true });
  }
};
