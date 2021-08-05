import { ThemeResolver, ThemeResolverOptions } from '.'
import * as path from 'path'

const options: ThemeResolverOptions[] = [
  {
    directories: [
      path.resolve(__dirname, '..', 'example', 'theme2', 'components'),
      path.resolve(__dirname, '..', 'example', 'theme1', 'components')
    ],
    prefix: '@components'
  },
  {
    directories: [
      path.resolve(__dirname, '..', 'example', 'theme1', 'assets'),
      path.resolve(__dirname, '..', 'example', 'theme2', 'assets')
    ],
    prefix: '@assets'
  },
]

test('a new instance can be created', () => {
  const instance = new ThemeResolver(options)
  expect(instance).toBeInstanceOf(ThemeResolver)
});

test('getResolver returns correct resolver', () => {
  const instance = new ThemeResolver(options)
  const result = instance.getResolver('@components/test')

  expect(result?.prefix).toBe('@components')

  const result2 = instance.getResolver('@assets/test')

  expect(result2?.prefix).toBe('@assets')
});

test('getFileName strips prefix', () => {
  const instance = new ThemeResolver(options)
  const resolver = instance.getResolver('@components/test')!

  const result = instance.getFileName('@components/test', resolver)

  expect(result).toBe('test')


  const result2 = instance.getFileName('@components/test/tester/tests', resolver)

  expect(result2).toBe('test/tester/tests')
});

test('resolveComponentPath returns correct component', () => {
  const instance = new ThemeResolver(options)
  const resolver = instance.getResolver('@components/test')!

  const result = instance.resolveComponentPath('comp1.vue', resolver.directories)

  expect(result).toBe(path.resolve(__dirname, '..', 'example', 'theme1', 'components', 'comp1.vue'))

  const result2 = instance.resolveComponentPath('comp2.vue', resolver.directories)

  expect(result2).toBe(path.resolve(__dirname, '..', 'example', 'theme2', 'components', 'comp2.vue'))

  const result3 = instance.resolveComponentPath('comp3.vue', resolver.directories)

  expect(result3).toBe(path.resolve(__dirname, '..', 'example', 'theme2', 'components', 'comp3.vue'))
});
