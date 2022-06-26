import semver from 'semver';

export class Tag {
  valid: boolean;
  value: string;

  constructor(tag: string) {
    this.value = semver.valid(tag) ? tag : '';
    this.valid = this.value !== '';
  }
}
