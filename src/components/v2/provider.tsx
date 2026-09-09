"use client";

/* ============ VIBELY 2.0 — Modal Provider (Order + Track) ============ */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { OrderModal } from "./order-modal";
import { TrackModal } from "./track-modal";

interface ModalCtxValue {
  openOrder: (pkgId?: string) => void;
  openTrack: (campaignId?: string) => void;
}

const ModalCtx = createContext<ModalCtxValue>({
  openOrder: () => {},
  openTrack: () => {},
});

export const useModals = () => useContext(ModalCtx);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderPkg, setOrderPkg] = useState<string | undefined>(undefined);
  const [orderNonce, setOrderNonce] = useState(0);
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackId, setTrackId] = useState<string | undefined>(undefined);

  const openOrder = useCallback((pkgId?: string) => {
    setOrderPkg(pkgId);
    setOrderNonce((n) => n + 1);
    setOrderOpen(true);
  }, []);

  const openTrack = useCallback((campaignId?: string) => {
    setTrackId(campaignId);
    setTrackOpen(true);
  }, []);

  const value = useMemo(() => ({ openOrder, openTrack }), [openOrder, openTrack]);

  return (
    <ModalCtx.Provider value={value}>
      {children}
      <OrderModal key={orderNonce} open={orderOpen} pkgId={orderPkg} onOpenChange={setOrderOpen} />
      <TrackModal key={trackId ?? "none"} open={trackOpen} initialId={trackId} onOpenChange={setTrackOpen} />
    </ModalCtx.Provider>
  );
}
