import type { FwIconLibrary } from './icon-library';
import { CRAYONS_ICONS_ASSET_PATH } from '../../global/crayons';
const library: FwIconLibrary = {
  name: 'crayons',
  resolver: (name) => `${CRAYONS_ICONS_ASSET_PATH}/${name}.svg`,
};

export default library;
