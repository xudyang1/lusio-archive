


const onDelete = (e) => {
    e.preventDefault();
    //deleteAccount(userProfile);
}

export default function SettingsPage() {
    return (
        <div>
            <div className="row z-depth-3">
                <div style={{ margin: "10px" }}>
                    <div>
                        <h4>Settings</h4>
                    </div>
                    <div className="valign-wrapper center">
                        <button color="dark" style={{ marginTop: '2rem' }} onClick={onDelete}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}