module.exports = {
  extends: ['@commitlint/config-conventional'],
};


// This is the commitlint configuration file that extends the conventional commit rules. 
/*
THESE ARE THE TYPES OF COMMITS ALLOWED:

feat:       new feature
fix:        bug fix
docs:       documentation updates
style:      formatting (no code changes)
refactor:   code restructuring
perf:       performance improvements
test:       adding/changing tests
build:      build system changes
ci:         CI setup changes
chore:      non-code tasks (deps, scripts)
revert:     revert a previous commit

ONLY ACCEPTING COMMITS IN THIS FORMAT 
type(scope?): message
e.g., feat(auth): add login feature
e.g., fix: correct typo in docs
*/