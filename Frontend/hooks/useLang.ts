import {useAppSelector} from '../hooks/store';

export default function useLang() {
  const lang = useAppSelector(state => state.locale.lang);
  const dir = useAppSelector(state => state.locale.dir);

  return {lang, dir};
}
