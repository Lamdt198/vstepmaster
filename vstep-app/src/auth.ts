import type { AuthProviderProps } from 'react-oidc-context';
import { WebStorageStateStore } from 'oidc-client-ts';

// Cấu hình OIDC trỏ tới Keycloak realm `truc`, client public `eng` (PKCE S256).
// Override qua biến môi trường VITE_* khi đổi sang domain thật sau này.
const authority =
  import.meta.env.VITE_OIDC_AUTHORITY ?? 'http://localhost:8080/realms/truc';
const clientId = import.meta.env.VITE_OIDC_CLIENT_ID ?? 'eng';

export const oidcConfig: AuthProviderProps = {
  authority,
  client_id: clientId,
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code',
  scope: 'openid profile email',
  // Giữ đăng nhập qua reload.
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  // Dọn ?code=&state= khỏi URL sau khi login xong.
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
