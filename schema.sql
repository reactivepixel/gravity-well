-- Create nodes table
CREATE TABLE IF NOT EXISTS nodes (
    id CHAR(26) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    properties JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create node_relations table
CREATE TABLE IF NOT EXISTS node_relations (
    id CHAR(26) PRIMARY KEY,
    parent_id CHAR(26) REFERENCES nodes(id) ON DELETE CASCADE,
    child_id CHAR(26) REFERENCES nodes(id) ON DELETE CASCADE,
    relation_type VARCHAR(50),
    properties JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_relation UNIQUE (parent_id, child_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_nodes_type ON nodes(type);
CREATE INDEX IF NOT EXISTS idx_node_relations_parent_child ON node_relations(parent_id, child_id);
CREATE INDEX IF NOT EXISTS idx_nodes_properties ON nodes USING GIN(properties);

-- Add comments
COMMENT ON TABLE nodes IS 'Stores hierarchical node entities like companies and users';
COMMENT ON TABLE node_relations IS 'Stores relationships between nodes with properties';
COMMENT ON COLUMN nodes.properties IS 'JSONB column for flexible property storage';
COMMENT ON COLUMN node_relations.properties IS 'JSONB column for relationship-specific properties';
COMMENT ON COLUMN nodes.updated_at IS 'Last modification timestamp';
COMMENT ON COLUMN node_relations.updated_at IS 'Last modification timestamp'; 