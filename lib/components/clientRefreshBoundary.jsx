'use client';
import ClientRefresh from "./clientRefresh";
export default function ClientRefreshBoundary({ shouldRefresh }) {
  return <ClientRefresh shouldRefresh={shouldRefresh} />;
}