import postcss from 'postcss';

export default postcss.plugin('postcss-starter', userOpts => {
  const opts = { ...{ root: ':root', prefix: 'parse-var' }, ...userOpts };

	return root => {
    const vars = {};

    // collect variables for replacing as { k: v } 
    root.walkRules(rule => {
      if (rule.selector === opts.root) {
        rule.walkDecls(decl => {
          vars[`${opts.prefix}(${decl.prop})`] = decl.value;
        });
      }
    });

    // replace keys with values
    Object.keys(vars).map((k) => {
      const find = new RegExp(escapeRegExp(k), 'g');
      root.replaceValues(find, { fast: opts.prefix }, () => {
        return vars[k];
      });
    });
	};
});

const escapeRegExp = str => {
  return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
