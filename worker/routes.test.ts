import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isAppShellPath, isStaticAssetPath } from './routes.ts'

describe('isAppShellPath', () => {
  it('allows home and numeric movie routes', () => {
    assert.equal(isAppShellPath('/'), true)
    assert.equal(isAppShellPath('/movies/550'), true)
    assert.equal(isAppShellPath('/movies/0'), true)
  })

  it('rejects unknown or non-numeric movie paths', () => {
    assert.equal(isAppShellPath('/nope'), false)
    assert.equal(isAppShellPath('/movies'), false)
    assert.equal(isAppShellPath('/movies/'), false)
    assert.equal(isAppShellPath('/movies/abc'), false)
    assert.equal(isAppShellPath('/movies/55a'), false)
    assert.equal(isAppShellPath('/movies/550/extra'), false)
  })
})

describe('isStaticAssetPath', () => {
  it('detects extensioned assets and skips html', () => {
    assert.equal(isStaticAssetPath('/assets/index-abc.js'), true)
    assert.equal(isStaticAssetPath('/favicon.svg'), true)
    assert.equal(isStaticAssetPath('/index.html'), false)
    assert.equal(isStaticAssetPath('/movies/550'), false)
  })
})
