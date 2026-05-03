/**
 * 預留：未來要在 boot 階段註冊 navigation guard、權限 meta 解析等可加在這裡。
 * 不要 await router.isReady() — initial navigation 要等 app.use(router) 後才會發生，
 * 在 boot 階段 await 會造成永遠不 resolve、整個 boot 卡死。
 */
export const preparePageRoute = async () => {};
