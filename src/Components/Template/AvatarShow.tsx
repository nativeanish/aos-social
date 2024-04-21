import React, { useEffect, useState } from "react";

function AvatarShow({ id }: { id: string }) {
  const data = useState<{ username: string; image: string } | null>(null);
  useEffect(() => {});
  return <div>AvatarLike</div>;
}

export default AvatarShow;
