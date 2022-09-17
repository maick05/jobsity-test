import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const YAML_CONFIG_FILENAME = '../../config/values.yaml';

export default () => {
  const configYaml = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8')
  ) as Record<string, any>;
  return configYaml;
};
