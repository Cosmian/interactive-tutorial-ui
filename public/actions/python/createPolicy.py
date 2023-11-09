from cloudproof_py.cover_crypt import Policy, PolicyAxis


async def create_policy():
    """Create Policy"""
    policy = Policy()
    
    policy.add_axis(
        PolicyAxis(
            "department",
            [
                ("Marketing", False),
                ("HR", False),
            ],
            hierarchical=False,  # this is NOT a hierarchical axis
        )
    )
    policy.add_axis(PolicyAxis(
            "country",[
                ("France", False), 
                ("Spain", False), 
                ("Germany", False)],
            hierarchical=False,  # this is NOT a hierarchical axis
        )
    )

    return policy
