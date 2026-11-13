// verifaied-test: Play/Undo moves
import { test, expect } from '@playwright/test';

test('Undo moves', async ({ page }) => {
  await page.goto('/?seed=42');
  await test.step("Undo is off before any move", async () => { await expect(page.getByRole('button', { name: 'Undo move' })).toBeDisabled(); await page.waitForTimeout(2000); });
  await test.step("Play the top-left cell", async () => { await page.getByRole('button', { name: 'Cell 1' }).click(); });
  await test.step("The bot answers", async () => { await expect(page.getByRole('status')).toHaveText('Your move'); await page.waitForTimeout(2000); });
  await test.step("Hold 2s", async () => { await expect(page.getByRole('button', { name: 'Cell 6' })).toBeDisabled(); await page.waitForTimeout(2000); });
  await test.step("Play the top-middle cell", async () => { await page.getByRole('button', { name: 'Cell 2' }).click(); });
  await test.step("The bot answers again", async () => { await expect(page.getByRole('status')).toHaveText('Your move'); await page.waitForTimeout(2000); });
  await test.step("Hold 2s", async () => { await expect(page.getByRole('button', { name: 'Cell 5' })).toBeDisabled(); await page.waitForTimeout(2000); });
  await test.step("Complete the top row", async () => { await page.getByRole('button', { name: 'Cell 3' }).click(); });
  await test.step("You win the game", async () => { await expect(page.getByRole('status')).toHaveText('X wins'); await page.waitForTimeout(2000); });
  await test.step("The win is counted", async () => { await expect(page.getByTestId('score-you')).toHaveText('1'); await page.waitForTimeout(2000); });
  await test.step("Undo the winning move", async () => { await page.getByRole('button', { name: 'Undo move' }).click(); });
  await test.step("The game is back on", async () => { await expect(page.getByRole('status')).toHaveText('Your move'); await page.waitForTimeout(2000); });
  await test.step("The win is taken back", async () => { await expect(page.getByTestId('score-you')).toHaveText('0'); await page.waitForTimeout(2000); });
  await test.step("Hold 2s", async () => { await expect(page.getByRole('button', { name: 'Cell 3' })).toBeEnabled(); await page.waitForTimeout(2000); });
  await test.step("Hold 2s", async () => { await expect(page.getByRole('button', { name: 'Cell 5' })).toBeDisabled(); await page.waitForTimeout(2000); });
  await test.step("Undo your move and the bot's", async () => { await page.getByRole('button', { name: 'Undo move' }).click(); });
  await test.step("Your move is gone", async () => { await expect(page.getByRole('button', { name: 'Cell 2' })).toBeEnabled(); await page.waitForTimeout(2000); });
  await test.step("The bot's reply is gone too", async () => { await expect(page.getByRole('button', { name: 'Cell 5' })).toBeEnabled(); await page.waitForTimeout(2000); });
  await test.step("Undo back to the start", async () => { await page.getByRole('button', { name: 'Undo move' }).click(); });
  await test.step("The board is empty again", async () => { await expect(page.getByRole('button', { name: 'Undo move' })).toBeDisabled(); await page.waitForTimeout(2000); });
  await test.step("Every cell is open", async () => { await expect(page.getByRole('button', { name: 'Cell 1' })).toBeEnabled(); await page.waitForTimeout(2000); });
  await test.step("Hold 2s", async () => { await expect(page.getByRole('button', { name: 'Cell 6' })).toBeEnabled(); await page.waitForTimeout(2000); });
});
