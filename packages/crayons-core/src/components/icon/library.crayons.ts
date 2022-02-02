import type { FwIconLibrary } from './library.icon.utils';
import { CRAYONS_ICONS_ASSET_PATH } from '../../global/crayons';
const library: FwIconLibrary = {
  name: 'crayons',
  resolver: (name) => `${CRAYONS_ICONS_ASSET_PATH}/${name}.svg`,
};

export default library;
